// Inspired from https://github.com/dfinity/examples/tree/master/rust/basic_dao

mod init;
mod service;
mod types;

use crate::service::ChairmanDaoService;
use crate::types::*;
use candid::Principal;
use ic_cdk_macros::*;
use std::cell::RefCell;

thread_local! {
    static SERVICE: RefCell<ChairmanDaoService> = RefCell::default();
}

// ** Account APIs **

#[query]
#[candid::candid_method(query)]
fn get_account(principal: Option<Principal>) -> Account {
    SERVICE.with(|service| service.borrow().get_account(principal))
}

#[query]
#[candid::candid_method(query)]
fn list_accounts() -> Vec<Account> {
    SERVICE.with(|service| service.borrow().list_accounts())
}

#[update]
#[candid::candid_method(query)]
fn add_account(principal: Principal, account: Account) {
    SERVICE.with(|service| service.borrow_mut().add_account(principal, account))
}

// ** Task APIs **

#[query]
#[candid::candid_method(query)]
fn get_task(task_id: u64) -> Task {
    SERVICE.with(|service| service.borrow().get_task(task_id)).unwrap()
}

#[query]
#[candid::candid_method(query)]
fn list_tasks() -> Vec<Task> {
    SERVICE.with(|service| service.borrow().list_tasks())
}

#[update]
#[candid::candid_method]
fn submit_task(title: String, description: String, rating: VotingPower) -> Result<u64, String> {
    SERVICE.with(|service| service.borrow_mut().submit_task(title, description, rating))
}

#[update]
#[candid::candid_method]
fn add_task_note(task_id: u64, note: String) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().add_take_note(task_id, note))
}

#[update]
#[candid::candid_method]
fn claim_task(task_id: u64) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().claim_task(task_id))
}

#[update]
#[candid::candid_method]
fn rate_task(task_id: u64, voting_power: VotingPower) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().rate_task(task_id, voting_power))
}

#[update]
#[candid::candid_method]
fn open_task(task_id: u64) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().open_task(task_id))
}

#[update]
#[candid::candid_method]
fn judge_claimant(task_id: u64, claim_id: u64, percentage: f64) -> Result<(), String> {
    SERVICE.with(|service| {
        service
            .borrow_mut()
            .judge_claimant(task_id, claim_id, percentage)
    })
}

#[update]
#[candid::candid_method]
fn complete_task(task_id: u64, do_close: bool) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().complete_task(task_id, do_close))
}

// ** Proposals API **

#[query]
#[candid::candid_method(query)]
fn get_proposal(proposal_id: u64) -> Proposal {
    SERVICE.with(|service| service.borrow().get_proposal(proposal_id)).unwrap()
}

#[query]
#[candid::candid_method(query)]
fn list_proposals() -> Vec<Proposal> {
    SERVICE.with(|service| service.borrow().list_proposals())
}

#[update]
#[candid::candid_method]
fn submit_proposal(
    title: String,
    description: String,
    notes: String,
    health_only: bool,
) -> Result<u64, String> {
    SERVICE.with(|service| {
        service
            .borrow_mut()
            .submit_proposal(title, description, notes, health_only)
    })
}

#[update]
#[candid::candid_method]
fn accept_proposal(
    proposal_id: u64,
    new_title: Option<String>,
    new_description: Option<String>,
    completion_notes: Option<String>,
) -> Result<(), String> {
    SERVICE.with(|service| {
        service.borrow_mut().accept_proposal(
            proposal_id,
            new_title,
            new_description,
            completion_notes,
        )
    })
}

#[update]
#[candid::candid_method]
fn reject_proposal(proposal_id: u64, completion_notes: Option<String>) -> Result<(), String> {
    SERVICE.with(|service| {
        service
            .borrow_mut()
            .reject_proposal(proposal_id, completion_notes)
    })
}

ic_cdk::export_candid!();
