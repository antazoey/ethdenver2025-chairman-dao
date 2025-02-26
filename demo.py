"""
Demo a fake coffee shop that makes coffee for Web3 devs.
"""

import shutil
from pathlib import Path

import click

from _util import (
    CandidExtractor,
    Dfx,
    dfx_network_context,
    dict_to_record,
    make_record,
    print_output,
)

# Initial employees => (health, spirit) points
EMPLOYEES = {
    "Alice": (20, 10),
    "Bob": (10, 0),
    "Chris": (0, 5),
}
CANISTER_NAME = "chairman_dao"


@click.group()
def dao_demo():
    """
    ETHDenver 2025 DAO demo
    """


@dao_demo.command()
def setup():
    """
    Ensures project is setup, build, and devnode running
    """
    dfx_path = Path(__file__) / ".dfx"
    shutil.rmtree(dfx_path, ignore_errors=True)
    Dfx.start()
    _setup()


@dao_demo.command()
def list_accounts():
    """
    Ensures project is setup, build, and devnode running
    """
    accounts = Dfx.call(CANISTER_NAME, "list_accounts")
    print_output(accounts)


@dao_demo.command()
def create_task():
    """
    Ensures project is setup, build, and devnode running
    """
    task_data = {
        "name": '"Upsold VIP table"',
        "description": '"A customer wanted a drink but I sold them a VIP table instead, increasing the sale by about 100x."',
        "proposed_amount": 10,
    }
    task = dict_to_record(task_data, suffix="")
    Dfx.call(CANISTER_NAME, "submit_task", f"{task}")
    print("Task created.")


@dao_demo.command()
def list_tasks():
    """
    Ensures project is setup, build, and devnode running
    """
    print("Showing all tasks")
    tasks = Dfx.call(CANISTER_NAME, "list_tasks")
    print_output(tasks)


def main():
    with dfx_network_context():
        run_demo()


def _setup():
    # dfx canister create chairman_dao
    # dfx build
    create_and_build_canisters()

    # dfx identity new --disable-encryption Alice|Bob|Chris
    # dfx identity get-principal --identity Alice|Bob|Chris
    alice, bob, chris = setup_employees()

    # dfx deploy --argument INIT-DATA
    deploy_canister(alice, bob, chris)


def create_and_build_canisters():
    CandidExtractor.extract(CANISTER_NAME)
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
        {
            "owner": f'principal "{principal}"',
            "health": EMPLOYEES[name][0],
            "spirit": EMPLOYEES[name][1],
        }
    )


if __name__ == "__main__":
    dao_demo()
