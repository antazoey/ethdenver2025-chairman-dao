import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./chairman_dao.did.js";
export { idlFactory } from "./chairman_dao.did.js";

import {AuthClient} from "@dfinity/auth-client";

const process = {
  env: {
    CANISTER_ID_CHAIRMAN_DAO: "bkyz2-fmaaa-aaaaa-qaaaq-cai",
    DFX_NETWORK: "local",
    LOGIN_URL: "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/"
  }
}

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  process.env.CANISTER_ID_CHAIRMAN_DAO;

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

const getChairmanDao =  async (authClient) => {
  // UNCOMMENT TO LOG OUT
  //authClient.logout()

  const hackInAccount = () => {
    console.log("HACK")
    // chairman_dao.add_account({
    //   owner: identity.getPrincipal(),
    //   voting_power: {
    //     health: BigInt(0),
    //     spirit: BigInt(0)
    //   },
    //   payouts: [],
    // }).then("HACK! I added your account to the employee list, shhhhh....")
    //
    // chairman_dao.list_accounts().then(console.log)
  }

  const isAuthenticated = await authClient.isAuthenticated()
  await hackInAccount()
  if (isAuthenticated) {
    console.log(`Authenticated`)
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    return createActor(canisterId, { agent });

  } else {
    console.log("Not authenticated")

    return createActor(canisterId);
  }
}

export const authClient = await AuthClient.create();
export const chairman_dao = await getChairmanDao(authClient)

const identity = authClient.getIdentity()
chairman_dao.add_account({
  owner: identity.getPrincipal(),
  voting_power: {
    health: BigInt(0),
    spirit: BigInt(0)
  },
  payouts: [],
}).then("HACK! I added your account to the employee list, shhhhh....")

chairman_dao.list_accounts().then(console.log)
