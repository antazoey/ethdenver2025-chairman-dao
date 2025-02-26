mod env;
mod init;
mod service;
mod types;

use crate::service::ChairmanDaoService;
use crate::types::*;
use ic_cdk_macros::*;
use std::cell::RefCell;

thread_local! {
    static SERVICE: RefCell<ChairmanDaoService> = RefCell::default();
}

#[query]
#[candid::candid_method(query)]
fn account_balance() -> u64 {
    SERVICE.with(|service| service.borrow().account_reputation())
}

#[query]
#[candid::candid_method(query)]
fn list_accounts() -> Vec<Account> {
    SERVICE.with(|service| service.borrow().list_accounts())
}

#[query]
#[candid::candid_method(query)]
fn list_tasks() -> Vec<Task> {
    SERVICE.with(|service| service.borrow().list_tasks())
}

#[update]
#[candid::candid_method]
fn submit_task(task: TaskInfo) -> Result<u64, String> {
    SERVICE.with(|service| service.borrow_mut().submit_task(task))
}

#[query]
#[candid::candid_method(query)]
fn get_proposal(task_id: u64) -> Option<Task> {
    SERVICE.with(|service| service.borrow().get_task(task_id))
}

#[query]
#[candid::candid_method(query)]
fn list_proposals() -> Vec<Task> {
    SERVICE.with(|service| service.borrow().list_tasks())
}

candid::export_service!();

#[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
