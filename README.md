# ETH Denver 2025 ChairmanDAO Project

Brought to you by the Snek-oil Shillers.

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


## Demo

To execute the demo script, run:

```python
python demo.py
```

The demo heavily uses the `dfx` command line tool.
The script does the following:

1. Ensures the ICP local network is running
2. Creates and builds the canisters for the DAO
3. Creates some fake employees (identities) for a fake business
4. Deploys the canister

