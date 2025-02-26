// Inspired from https://github.com/dfinity/examples/tree/master/rust/basic_dao

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
    pub state: TaskState,
    pub info: TaskInfo
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
    pub health: u64,
    pub spirit: u64,
}
#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Proposal {
    pub id: u64,
    pub proposer: Principal,
    pub payload: ProposalPayload,
    pub proposal_state: ProposalState,
    pub votes_yes_count: u64,
    pub votes_no_count: u64,
    pub voters: Vec<Principal>,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct ProposalPayload {
    pub proposer: Principal,
    pub cost: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
pub enum ProposalState {
    Open,
    Accepted,
    Rejected,
}
