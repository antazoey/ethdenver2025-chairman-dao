"""
Demo a fake coffee shop that makes coffee for Web3 devs.
"""

from _util import Dfx

# Initial employees => reputation points
EMPLOYEES = {
    "Alice": 20,
    "Bob": 10,
    "Chris": 5,
}


def main():
    # dfx start
    ensure_network_running()

    # dfx canister create --all
    # dfx build
    create_and_build_canisters()

    # dfx identity new --disable-encryption Alice|Bob|Chris
    # dfx identity get-principal --identity Alice|Bob|Chris
    alice, bob, chris = setup_employees()

    # dfx deploy --argument INIT-DATA
    deploy_canister(alice, bob, chris)


def ensure_network_running():
    Dfx.start()


def create_and_build_canisters():
    Dfx.create_canisters(all=True)
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
    Dfx.deploy("chairman_dao", data)


if __name__ == "__main__":
    main()
