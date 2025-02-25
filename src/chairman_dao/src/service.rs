use crate::env::{EmptyEnvironment, Environment};
use crate::types::{Task, TaskInfo, ChairmanDaoStableStorage, Account, TaskState};
use candid::Principal;
use std::collections::HashMap;

/// Implements the Basic DAO interface
pub struct ChairmanDaoService {
    pub env: Box<dyn Environment>,
    pub accounts: HashMap<Principal, u64>,
    pub tasks: HashMap<u64, Task>,
    pub next_task_id: u64,
}

impl Default for ChairmanDaoService {
    fn default() -> Self {
        ChairmanDaoService {
            env: Box::new(EmptyEnvironment {}),
            accounts: HashMap::new(),
            tasks: HashMap::new(),
            next_task_id: 0,
        }
    }
}

impl From<ChairmanDaoStableStorage> for ChairmanDaoService {
    fn from(stable: ChairmanDaoStableStorage) -> ChairmanDaoService {
        let accounts = stable
            .accounts
            .clone()
            .into_iter()
            .map(|a| (a.owner, a.reputation))
            .collect();
        let tasks = stable
            .tasks
            .clone()
            .into_iter()
            .map(|p| (p.id, p))
            .collect();

        ChairmanDaoService {
            env: Box::new(EmptyEnvironment {}),
            accounts,
            tasks,
            next_task_id: 0,
        }
    }
}

/// Implements the Basic DAO interface
impl ChairmanDaoService {
    /// Return the account balance of the caller
    pub fn account_reputation(&self) -> u64 {
        let caller = self.env.caller();
        self.accounts
            .get(&caller)
            .cloned()
            .unwrap_or_else(|| Default::default())
    }

    /// Lists all accounts
    pub fn list_accounts(&self) -> Vec<Account> {
        self.accounts
            .clone()
            .into_iter()
            .map(|(owner, reputation)| Account { owner, reputation })
            .collect()
    }

    pub fn submit_task(&mut self, info: TaskInfo) -> Result<u64, String> {
        let task_id = self.next_task_id;
        self.next_task_id += 1;

        let task = Task {
            id: task_id,
            task_info: info,
            creator: self.env.caller(),
            task_state: TaskState::Open,
        };

        self.tasks.insert(task_id, task);
        Ok(task_id)
    }

    pub fn get_task(&self, task_id: u64) -> Option<Task> {
        self.tasks.get(&task_id).cloned()
    }

    pub fn list_tasks(&self) -> Vec<Task> {
        self.tasks.values().cloned().collect()
    }
}
