use candid::{CandidType, Deserialize, Principal};
use std::ops::{Add, AddAssign, Mul, SubAssign};

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct ChairmanDaoStableStorage {
    pub accounts: Vec<Account>,
    pub tasks: Vec<Task>,
}

#[derive(Clone, Copy, Debug, Default, CandidType, Deserialize, PartialEq, PartialOrd)]
pub struct Reputation {
    pub amount_e8s: u64,
}

impl Add for Reputation {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Reputation {
            amount_e8s: self.amount_e8s + other.amount_e8s,
        }
    }
}

impl AddAssign for Reputation {
    fn add_assign(&mut self, other: Self) {
        self.amount_e8s += other.amount_e8s;
    }
}

impl SubAssign for Reputation {
    fn sub_assign(&mut self, other: Self) {
        self.amount_e8s -= other.amount_e8s;
    }
}

impl Mul<u64> for Reputation {
    type Output = Reputation;
    fn mul(self, rhs: u64) -> Self {
        Reputation {
            amount_e8s: self.amount_e8s * rhs,
        }
    }
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
    pub proposed_amount: Reputation,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Account {
    pub owner: Principal,
    pub reputation: Reputation,
}
