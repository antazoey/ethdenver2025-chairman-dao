"""
Demo a fake coffee shop that makes coffee for Web3 devs.
"""

from _util import Dfx, dfx_local_network, dfx_network_context, print_output

# Initial employees => reputation points
EMPLOYEES = {
    "Alice": 20,
    "Bob": 10,
    "Chris": 5,
}
CANISTER_NAME = "chairman_dao"


# @dfx_local_network
def main():
    with dfx_network_context():
        # dfx canister create chairman_dao
        # dfx build
        create_and_build_canisters()

        # dfx identity new --disable-encryption Alice|Bob|Chris
        # dfx identity get-principal --identity Alice|Bob|Chris
        alice, bob, chris = setup_employees()

        # dfx deploy --argument INIT-DATA
        deploy_canister(alice, bob, chris)

        accounts = Dfx.call(CANISTER_NAME, "list_accounts")
        print_output(accounts)


def create_and_build_canisters():
    try:
        Dfx.get_canister_id(CANISTER_NAME)
    except ValueError:
        # Create them.
        Dfx.create_canisters()
        Dfx.build()


def setup_employees() -> list[str]:
    identities = Dfx.get_identities()
    principals = []
    for employee in EMPLOYEES:
        if employee not in identities:
            Dfx.create_identity(employee)

        principal = Dfx.get_principal(identity=employee)
        principals.append(principal)

    return principals


def deploy_canister(alice, bob, chris):
    data = f"(record {{ accounts = vec {{ record {{ owner = principal \"{alice}\"; reputation = {EMPLOYEES['Alice']}; }}; }}; tasks = vec {{}}; }})"
    Dfx.deploy(CANISTER_NAME, data)


if __name__ == "__main__":
    main()
