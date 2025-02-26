"""
Demo a fake coffee shop that makes coffee for Web3 devs.
"""

from contextlib import contextmanager

from _util import (
    Dfx,
    clean,
    dfx_network_context,
    dict_to_record,
    make_record,
    print_output,
)

# Initial employees => reputation points
EMPLOYEES = {
    "Alice": 20,
    "Bob": 10,
    "Chris": 5,
}
CANISTER_NAME = "chairman_dao"


def main():
    with fresh_context():
        run_demo()


@contextmanager
def fresh_context():
    with dfx_network_context():
        try:
            yield
        finally:
            clean()


def run_demo():
    # dfx canister create chairman_dao
    # dfx build
    create_and_build_canisters()

    # dfx identity new --disable-encryption Alice|Bob|Chris
    # dfx identity get-principal --identity Alice|Bob|Chris
    alice, bob, chris = setup_employees()

    # dfx deploy --argument INIT-DATA
    deploy_canister(alice, bob, chris)

    print("WELCOME TO COFFEE CORP")
    print("Employees:")
    accounts = Dfx.call(CANISTER_NAME, "list_accounts")
    print_output(accounts)
    print()

    print("What's that, Chris? You want to create a Task... Ok then.")
    task_data = {
        "name": '"Upsold VIP table"',
        "description": '"A customer wanted a drink but I sold them a VIP table instead, increasing the sale by about 100x."',
        "proposed_amount": 10,
    }
    task = dict_to_record(task_data, suffix="")
    Dfx.call(CANISTER_NAME, "submit_task", f"{task}")
    print("Task created.")

    print("Showing all tasks")
    tasks = Dfx.call(CANISTER_NAME, "list_tasks")
    print_output(tasks)


def create_and_build_canisters():
    try:
        Dfx.get_canister_id(CANISTER_NAME)
    except ValueError:
        # Create them.
        Dfx.create_canister(CANISTER_NAME)
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
    alice_str = _make_account_str("Alice", alice)
    bob_str = _make_account_str("Bob", bob)
    chris_str = _make_account_str("Chris", chris)
    data_str = (
        f"accounts = vec {{ {alice_str} {bob_str} {chris_str} }}; tasks = vec {{}};"
    )
    data = f"({make_record(data_str, suffix='')})"
    Dfx.deploy(CANISTER_NAME, data)


def _make_account_str(name: str, principal: str) -> str:
    return dict_to_record(
        {"owner": f'principal "{principal}"', "reputation": EMPLOYEES[name]}
    )


if __name__ == "__main__":
    main()
