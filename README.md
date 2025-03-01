# ETH Denver 2025 Chairman DAO Project

Brought to you by the Snek-oil Shillers.

## Project Idea

Chairman DAO is a DAO framework for worker-owned cooperatives built on ICP.

## Prerequisites

* `dfx` tool: follow [this guide](https://internetcomputer.org/docs/current/developer-docs/getting-started/install)
* Rust, including `wasm32-unknown-unknown`:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default stable
rustup target add wasm32-unknown-unknown
```

* NPM and typescript

## Install

Once all prerequisites are installed, install the project by doing:

```shell
npm install
```

## Running a DAO

First, ensure you have the canisters created for your instance by running:

```shell
npm run setup
```

All the canister should have been created.
Next, you can build the service by doing:

```shell
npm run build
```

**NOTE**: For some reason, at this point I have to edit the `src/declarations/chairman_dao/index.js` declaration file to hardcode the canister ID in the `process.env:

```typescript
const process = {
  env: {
    CANISTER_ID_CHAIRMAN_DAO: "<CANISETER_ID",
    DFX_NETWORK: "local",
  }
}
```

If you are using the local ICP network, run:

```shell
dfx start --background --clean
```

Now that the service is built and the canisters are created, you can deploy the code to the canisters by running:

```shell
dfx deploy
```

**NOTE**: To deploy a demo coffee-shop DAO, run the `deploy_demo` script:

```shell
npm run deploy-demo
```

Launch the development server to see your DAO:

```shell
npm start
```

To teardown your development network, run:

```
dfx stop
```

### Developing

If you make changes to the server, you will need to re-generate the candid files.
First, build the service:

```shell
cargo build --release --target wasm32-unknown-unknown --package chairman_dao
```

Then, update the candid file:

```shell
candid-extractor target/wasm32-unknown-unknown/release/chairman_dao.wasm > src/chairman_dao/src/chairman_dao.did
```

If needing to generate the declarations files for the frontend, run:

```shell
dfx generate
```

## Attribution

Much inspiration for the smart-contract came from the [official ICP example DAO](https://github.com/dfinity/examples/tree/master/rust/basic_dao).
