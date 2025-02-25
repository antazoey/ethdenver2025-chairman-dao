use candid::{CandidType, Deserialize, Principal};

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct ChairmanDaoStableStorage {
    pub accounts: Vec<Account>,
    pub tasks: Vec<Task>,
}


// The state of a task
#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
pub enum TaskState {
    Open,
    Closed,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Task {
    pub id: u64,
    pub creator: Principal,
    pub task_state: TaskState,
    pub task_info: TaskInfo
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct TaskInfo {
    pub name: String,
    pub description: String,
    pub proposed_amount: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Account {
    pub owner: Principal,
    pub reputation: u64,
}
