// Inspired from https://github.com/dfinity/examples/tree/master/rust/basic_dao

use crate::types::{
    Account, ChairmanDaoStableStorage, Claim, Payout, Proposal, ProposalState, Task, TaskNote,
    TaskState, VotingPower,
};
use candid::Principal;
use std::collections::HashMap;

pub struct ChairmanDaoService {
    pub accounts: HashMap<Principal, Account>,
    pub tasks: Vec<Task>,
    pub proposals: Vec<Proposal>,

    // The percentage of ratings needed to open a task for claiming.
    pub task_rating_threshold: f64,
}

impl Default for ChairmanDaoService {
    fn default() -> Self {
        ChairmanDaoService {
            accounts: HashMap::new(),
            tasks: Vec::new(),
            proposals: Vec::new(),
            task_rating_threshold: 0.5,
        }
    }
}

impl From<ChairmanDaoStableStorage> for ChairmanDaoService {
    fn from(stable: ChairmanDaoStableStorage) -> ChairmanDaoService {
        let accounts = stable
            .accounts
            .clone()
            .into_iter()
            .map(|a| (a.owner, a))
            .collect();
        let tasks = stable.tasks.clone().into_iter().collect();
        let proposals = stable.proposals.clone().into_iter().collect();

        ChairmanDaoService {
            accounts,
            tasks,
            proposals,
            task_rating_threshold: 0.5,
        }
    }
}

impl ChairmanDaoService {
    // ** Account APIs **
    pub fn get_account(&self, principal: Option<Principal>) -> Account {
        let caller = principal.unwrap_or(ic_cdk::caller());
        self.accounts.get(&caller).cloned().unwrap()
    }

    pub fn list_accounts(&self) -> Vec<Account> {
        self.accounts
            .clone()
            .into_iter()
            .map(|(_, account)| account)
            .collect()
    }

    // TODO: Implement an actual flow for adding accounts in an authorized way.
    //  (perhaps via manager or corporate consensus). Right now, this method is
    //  un-authed for the sake of demo-ing and development.
    pub fn add_account(&mut self, account: Account) {
        self.accounts.insert(account.owner, account);
    }

    // Get the employee with the most voting power.
    pub fn get_manager(&self) -> Option<Account> {
        self.accounts
            .values()
            .into_iter()
            .max_by_key(|account| account.voting_power.health + account.voting_power.spirit)
            .cloned()
    }

    // ** Task APIs **

    pub fn get_task(&self, task_id: u64) -> Result<Task, String> {
        if let Some(task) = self.tasks.iter().find(|t| t.id == task_id) {
            Ok(task.clone())
        } else {
            Err(format!("Task with ID {} not found", task_id))
        }
    }

    pub fn list_tasks(&self) -> Vec<Task> {
        self.tasks.clone()
    }

    // Submit a task to be claimed.
    pub fn submit_task(
        &mut self,
        title: String,
        description: String,
        rating: VotingPower,
    ) -> Result<u64, String> {
        self.require_employee()?;
        let task_id = self.tasks.len() as u64;
        let task = Task {
            id: task_id,
            title,
            description,
            state: TaskState::Open,
            voting_power: VotingPower {
                health: 0,
                spirit: 0,
            },
            claims: Vec::new(),
            notes: Vec::new(),
            ratings: HashMap::from([(ic_cdk::caller(), rating.clone())]),
            estimated_health: rating.health,
            estimated_spirit: rating.spirit,
        };
        self.tasks.push(task);
        Ok(task_id)
    }

    // Add a note to task arguing a claim (or anything else).
    pub fn add_take_note(&mut self, task_id: u64, note: String) -> Result<(), String> {
        self.require_employee()?;
        let mut task = self.get_task(task_id)?;
        let note = TaskNote {
            author: ic_cdk::caller(),
            note,
        };
        task.notes.push(note);
        Ok(())
    }

    // Each employee rates in their opinion what the task's voting power is worth.
    pub fn rate_task(&mut self, task_id: u64, voting_power: VotingPower) -> Result<(), String> {
        self.require_employee()?;
        let mut task = self.get_task(task_id)?;

        if task.state != TaskState::Pending {
            return Err(format!("Task with ID {} is not rateable", task_id));
        }

        task.ratings.insert(ic_cdk::caller(), voting_power);

        // Check if everyone has rated the task. If so, we can change its state now
        // so that it can be claimed.
        if self.accounts.keys().all(|a| task.ratings.contains_key(a)) {
            self.move_task_to_open(task)?
        }

        Ok(())
    }

    // Useful for when not everyone has voted; allows manager to still proceed.
    pub fn open_task(&mut self, task_id: u64) -> Result<(), String> {
        self.require_employee()?;
        self.require_manager()?;
        let task = self.get_task(task_id)?;

        // Ensure the task has at least reached the minimum threshold for ratings.
        let num_votes: u64 = task.ratings.len() as u64;
        let number_employees: u64 = self.accounts.len() as u64;
        let minimum_vote_threshold: f64 = self.task_rating_threshold * number_employees as f64;
        let minimum_num_votes: u64 = minimum_vote_threshold.round() as u64;
        if num_votes < minimum_num_votes {
            return Err(format!(
                "Cannot open task. Requires a minimum of {} votes; has {}",
                minimum_num_votes, num_votes
            ));
        }

        self.move_task_to_open(task)
    }

    // Add yourself to the claimers vector to potentially get some of the claim during completion
    // (after everyone has voted).
    pub fn claim_task(&mut self, task_id: u64) -> Result<(), String> {
        self.require_employee()?;
        let mut task = self.get_task(task_id)?;

        if task.state != TaskState::Open {
            return Err(format!("Task with ID {} is not yet claimable", task_id));
        }

        let claim = Claim {
            account: ic_cdk::caller(),
            percentage: 0.0,
        };
        task.claims.push(claim);
        Ok(())
    }

    // Judge on the people who have claimed by given them a "percentage" of the total voting power.
    pub fn judge_claimant(
        &mut self,
        task_id: u64,
        claim_id: u64,
        percentage: f64,
    ) -> Result<(), String> {
        self.require_employee()?;
        let mut task = self.get_task(task_id)?;

        if task.state != TaskState::Open {
            return Err(format!(
                "Task with ID {} is not ready to have claims judged.",
                task_id
            ));
        }

        if percentage > 1.0 {
            return Err(format!(
                "Cannot give claim-award {} because it is greater than the max percentage {}",
                percentage, percentage
            ));
        }

        let claim_index = claim_id as usize; // Convert claim_id to usize
        if let Some(claim) = task.claims.get_mut(claim_index) {
            claim.percentage = percentage;
            Ok(())
        } else {
            Err(format!("Claim with ID {} not found", claim_id))
        }
    }

    // After everyone has judged or the manager has proceeded the task, the task's points can be
    // awarded out.
    pub fn complete_task(&mut self, task_id: u64, do_close: bool) -> Result<(), String> {
        self.require_manager()?;

        let mut task = self.get_task(task_id)?;
        if task.state != TaskState::Open {
            return Err(format!("Task with ID {} is not complete-able.", task_id));
        }

        if do_close {
            task.state = TaskState::Closed;
        }

        // Calculate awards.
        let sum_percentage = task
            .claims
            .iter()
            .map(|claim| claim.percentage)
            .sum::<f64>();
        let average_percentage = sum_percentage / self.tasks.len() as f64;
        let health_award = (average_percentage * task.voting_power.health as f64).round() as u64;
        let spirit_award = (average_percentage * task.voting_power.spirit as f64).round() as u64;

        // Give out awards.
        for claim in task.claims.iter() {
            let mut account = self.get_account(Some(claim.account));
            let voting_power = VotingPower {
                health: health_award,
                spirit: spirit_award,
            };
            let payout = Payout {
                timestamp: ic_cdk::api::time(),
                voting_power,
            };

            // Add payout stub.
            account.payouts.push(payout);

            // Add totals.
            account.voting_power.health += health_award;
            account.voting_power.spirit += spirit_award;
        }

        Ok(())
    }

    // ** Proposal APIS **

    pub fn get_proposal(&self, proposal_id: u64) -> Result<Proposal, String> {
        if let Some(proposal) = self.proposals.iter().find(|p| p.id == proposal_id) {
            Ok(proposal.clone())
        } else {
            Err(format!("Proposal with ID {} not found", proposal_id))
        }
    }

    pub fn list_proposals(&self) -> Vec<Proposal> {
        self.proposals.clone()
    }

    pub fn submit_proposal(
        &mut self,
        title: String,
        description: String,
        notes: String,
        health_only: bool,
    ) -> Result<u64, String> {
        self.require_employee()?;
        let proposal_id = self.proposals.len() as u64;
        let proposal = Proposal {
            id: proposal_id,
            title,
            new_title: None,
            description,
            notes,
            new_description: None,
            completion_notes: None,
            health_only,
            state: ProposalState::Open,
        };
        self.proposals.push(proposal);
        Ok(proposal_id)
    }

    pub fn accept_proposal(
        &mut self,
        proposal_id: u64,
        new_title: Option<String>,
        new_description: Option<String>,
        completion_notes: Option<String>,
    ) -> Result<(), String> {
        self.require_employee()?;
        let mut proposal = self.get_proposal(proposal_id)?;
        proposal.new_title = new_title;
        proposal.new_description = new_description;
        proposal.completion_notes = completion_notes;
        proposal.state = ProposalState::Accepted;
        Ok(())
    }

    pub fn reject_proposal(
        &mut self,
        proposal_id: u64,
        completion_notes: Option<String>,
    ) -> Result<(), String> {
        self.require_employee()?;
        let mut proposal = self.get_proposal(proposal_id)?;
        proposal.completion_notes = completion_notes;
        proposal.state = ProposalState::Rejected;
        Ok(())
    }

    // ** Private helpers **

    fn require_employee(&self) -> Result<(), String> {
        if !self.accounts.contains_key(&ic_cdk::caller()) {
            return Err(String::from("Not authorized: not a registered account"));
        }

        Ok(())
    }

    fn require_manager(&self) -> Result<(), String> {
        let manager = self.get_manager().unwrap();

        if ic_cdk::caller() != manager.owner {
            return Err(String::from("Not authorized: must have 'manager' status"));
        }

        Ok(())
    }

    fn move_task_to_open(&self, mut task: Task) -> Result<(), String> {
        task.state = TaskState::Open;

        // After everyone has rated the task, its final health and spirit cores can be set.
        // Loss of health/spirit is OK because this is a worthless currency.
        let sum_health = self
            .tasks
            .iter()
            .map(|task| task.voting_power.health)
            .sum::<u64>();
        let sum_spirit = self
            .tasks
            .iter()
            .map(|task| task.voting_power.spirit)
            .sum::<u64>();
        let average_health = sum_health / self.tasks.len() as u64;
        let average_spirit = sum_spirit / self.tasks.len() as u64;
        task.voting_power.health = average_health;
        task.voting_power.spirit = average_spirit;
        Ok(())
    }
}
