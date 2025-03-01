// Inspired from https://github.com/dfinity/examples/tree/master/rust/basic_dao

use candid::{CandidType, Deserialize, Principal};
use std::collections::HashMap;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct ChairmanDaoStableStorage {
    pub accounts: Vec<Account>,
    pub tasks: Vec<Task>,
    pub proposals: Vec<Proposal>,
}

// The state of a task
#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
pub enum TaskState {
    // Before claim
    Pending,

    // Claimable
    Open,

    // Finished
    Closed,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Claim {
    // The employee claiming a task.
    pub account: Principal,

    // Health/Spirit points (doesn't need to be that exact)
    // This is given to the claimer by their peers.
    pub percentage: f64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct TaskNote {
    pub author: Principal,
    pub note: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct VotingPower {
    pub health: u64,
    pub spirit: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Task {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub state: TaskState,

    // This is the final voting power which gets set
    // after all the ratings are in.
    pub voting_power: VotingPower,

    // Employees can claim a task once the ratings are in.
    // Then, their peers can rate their claim.
    // Both the claimer and the rating are in the Claim model.
    pub claims: Vec<Claim>,

    pub notes: Vec<TaskNote>,

    // Each employee has the chance to rate the task's voting power,
    // which happens in the "Open" state.
    pub ratings: HashMap<Principal, VotingPower>,

    // When creating a task, the user will give it an estimated power
    pub estimated_health: u64,
    pub estimated_spirit: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Payout {
    pub timestamp: u64,
    pub voting_power: VotingPower,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Account {
    pub owner: Principal,
    pub voting_power: VotingPower,
    pub payouts: Vec<Payout>,
}

#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
pub enum ProposalState {
    Open,
    Accepted,
    Rejected,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Proposal {
    pub id: u64,
    pub title: String,
    pub new_title: Option<String>,
    pub description: String,
    pub notes: String,
    pub new_description: Option<String>,
    pub completion_notes: Option<String>,
    pub health_only: bool,
    pub state: ProposalState,
}
