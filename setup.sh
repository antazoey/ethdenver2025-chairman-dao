#!/bin/bash

dsx start --background
dfx canister create chairman_dao
cargo build --release --target wasm32-unknown-unknown --package chairman_dao

