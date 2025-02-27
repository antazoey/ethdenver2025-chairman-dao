// Inspired from https://github.com/dfinity/examples/tree/master/rust/basic_dao

use crate::service::ChairmanDaoService;
use crate::types::ChairmanDaoStableStorage;
use crate::SERVICE;
use ic_cdk_macros::init;

#[init]
fn init(init_state: ChairmanDaoStableStorage) {
    ic_cdk::setup();
    let init_service = ChairmanDaoService::from(init_state);
    SERVICE.with(|service| *service.borrow_mut() = init_service);
}
