# ETH Denver 2025 ChairmanDAO Project

Brought to you by the Snek-oil Shillers.

## Project Idea

TODO: Sam please fill this part out with a brief overview of the project.

## Install

Ensure you have `dfx` installed by following [this guide](https://internetcomputer.org/docs/current/developer-docs/getting-started/install).
You also need Python 3.13 to run the demo.

Install the React FE via:

```# install Node
npm create vite@4.1.0
```

## React Frontend

Launch the FE by doing:

```cd web
npm run dev
```

## ICP Backend

To start the ICP local testnet, build the service, create the canister and the users (or ensure they are created, and
deploy the canister, run the `setup` command:

```python
python demo.py setup
```

It should display the output of what it is doing:

```
Input: dfx start --background
Running dfx start for version 0.25.0
Using the default configuration for the local shared network.
Replica API running in the background on 127.0.0.1:4943
Input: dfx canister create chairman_dao
Input: dfx build
Input: dfx identity list
Input: dfx identity get-principal --identity Alice
Input: dfx identity get-principal --identity Bob
Input: dfx identity get-principal --identity Chris
Input: dfx deploy chairman_dao --yes --argument (record { accounts = vec { record { owner = principal "cjckl-hz5jj-at2o5-6lvu4-fd7cc-6uctc-77rgg-4nxka-bri4e-gldl3-sqe"; health = 20; spirit = 10;  }; record { owner = principal "63eu6-sjaew-k236w-c4jez-pvubc-c6kcx-wj6p3-xfwob-b2rj4-snhpf-dqe"; health = 10; spirit = 0;  }; record { owner = principal "d3ez4-mahrj-4bnvh-ncwvu-lljbt-4khrw-ukiiy-clneo-thzxu-2fgr2-tae"; health = 0; spirit = 5;  }; }; tasks = vec {}; })
```

To see that it is working, do:

```
python demo.py list-accounts
```

It should display:

```
Input: dfx canister call chairman_dao list_accounts ()
Output: (
  vec {
    record {
      owner = principal "cjckl-hz5jj-at2o5-6lvu4-fd7cc-6uctc-77rgg-4nxka-bri4e-gldl3-sqe";
      spirit = 10 : nat64;
      health = 20 : nat64;
    };
    record {
      owner = principal "63eu6-sjaew-k236w-c4jez-pvubc-c6kcx-wj6p3-xfwob-b2rj4-snhpf-dqe";
      spirit = 0 : nat64;
      health = 10 : nat64;
    };
    record {
      owner = principal "d3ez4-mahrj-4bnvh-ncwvu-lljbt-4khrw-ukiiy-clneo-thzxu-2fgr2-tae";
      spirit = 5 : nat64;
      health = 0 : nat64;
    };
  },
)
```

Create the example task by doing:

```
python demo.py create-task
```

It should show:

```
Input: dfx canister call chairman_dao submit_task (record { name = "Upsold VIP table"; description = "A customer wanted a drink but I sold them a VIP table instead, increasing the sale by about 100x."; proposed_amount = 10;  })
Task created.
```

To list all tasks, do:

```
python demo.py list-tasks
```

It should show:

```
Showing all tasks
Input: dfx canister call chairman_dao list_tasks ()
Output: (
  vec {
    record {
      id = 0 : nat64;
      creator = principal "63eu6-sjaew-k236w-c4jez-pvubc-c6kcx-wj6p3-xfwob-b2rj4-snhpf-dqe";
      info = record {
        name = "Upsold VIP table";
        description = "A customer wanted a drink but I sold them a VIP table instead, increasing the sale by about 100x.";
        proposed_amount = 10 : nat64;
      };
      state = variant { Open };
    };
  },
)
```

To teardown the network, run:

```
dfx stop
```

## Attribution

Much inspiration for the smart-contract came from the [official ICP example DAO](https://github.com/dfinity/examples/tree/master/rust/basic_dao).
