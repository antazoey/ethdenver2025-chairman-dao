use candid::Principal;

/// The functions that are provided by the environment that the canister runs in
///
/// This is primarily used to enable mocking out these values in tests
pub trait Environment {
    fn caller(&self) -> Principal;
}

pub struct CanisterEnvironment {}

impl Environment for CanisterEnvironment {
    fn caller(&self) -> Principal {
        ic_cdk::caller()
    }
}

pub struct EmptyEnvironment {}

impl Environment for EmptyEnvironment {
    fn caller(&self) -> Principal {
        unimplemented!()
    }
}

#[cfg(test)]
pub struct TestEnvironment {
    pub caller: Principal,
}

#[cfg(test)]
impl Environment for TestEnvironment {
    fn caller(&self) -> Principal {
        self.caller
    }
}
