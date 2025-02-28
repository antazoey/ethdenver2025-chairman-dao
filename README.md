# ETH Denver 2025 Chairman DAO Project

Brought to you by the Snek-oil Shillers.

## Project Idea

TODO: Sam please fill this part out with a brief overview of the project.

## Install

Install Rust via:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default stable
rustup target add wasm32-unknown-unknown
```

Ensure you have `dfx` installed by following [this guide](https://internetcomputer.org/docs/current/developer-docs/getting-started/install).

Install the React FE via:

```shell
# install Node
npm create vite@4.1.0
```

## React Frontend

Launch the FE by doing:

```shell
cd web
npm run dev
```

## ICP Backend

The backend is powered by the [Internet Computer Protocol](https://internetcomputer.org/).
If making changes, first see the [Contributing](#Developing) section.

First, start the local developer replica:

```shell
dfx start --background
```

Next, generate the canister ID:

```shell
dfx canister create chairman_dao
```

Now we can build the canister (if you haven't already!):

```shell
cargo build --release --target wasm32-unknown-unknown --package chairman_dao
```

The above three steps are also available in the `setup.sh` script in the root of the project.

To deploy the canister as your backend, run the `deploy` command:

```shell
dfx deploy
```

And fill out the details for your `ChairmanDao` instance.
It should also launch an instance URL for you to call methods on the instance from the browser.

To teardown the network, run:

```
dfx stop
```

### Developing

First, build the service:

```shell
cargo build --release --target wasm32-unknown-unknown --package chairman_dao
```

Then, update the candid file:

```shell
candid-extractor target/wasm32-unknown-unknown/release/chairman_dao.wasm > src/chairman_dao/src/chairman_dao.did
```

## Attribution

Much inspiration for the smart-contract came from the [official ICP example DAO](https://github.com/dfinity/examples/tree/master/rust/basic_dao).
