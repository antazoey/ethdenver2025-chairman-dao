use crate::env::CanisterEnvironment;
use crate::SERVICE;
use crate::service::ChairmanDaoService;
use ic_cdk_macros::init;
use crate::types::ChairmanDaoStableStorage;

#[init]
fn init(init_state: ChairmanDaoStableStorage) {
    ic_cdk::setup();

    let mut init_service = ChairmanDaoService::from(init_state);
    init_service.env = Box::new(CanisterEnvironment {});

    SERVICE.with(|service| *service.borrow_mut() = init_service);
}
