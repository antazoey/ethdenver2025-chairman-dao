import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'voting_power' : VotingPower,
  'payouts' : Array<Payout>,
}
export interface ChairmanDaoStableStorage {
  'tasks' : Array<Task>,
  'accounts' : Array<Account>,
  'proposals' : Array<Proposal>,
}
export interface Claim { 'account' : Principal, 'percentage' : number }
export interface Payout { 'timestamp' : bigint, 'voting_power' : VotingPower }
export interface Proposal {
  'id' : bigint,
  'new_description' : [] | [string],
  'title' : string,
  'description' : string,
  'state' : ProposalState,
  'completion_notes' : [] | [string],
  'new_title' : [] | [string],
  'notes' : string,
  'health_only' : boolean,
}
export type ProposalState = { 'Open' : null } |
  { 'Rejected' : null } |
  { 'Accepted' : null };
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : bigint } |
  { 'Err' : string };
export interface Task {
  'id' : bigint,
  'claims' : Array<Claim>,
  'estimated_spirit' : bigint,
  'title' : string,
  'estimated_health' : bigint,
  'ratings' : Array<[Principal, VotingPower]>,
  'description' : string,
  'state' : TaskState,
  'notes' : Array<TaskNote>,
  'voting_power' : VotingPower,
}
export interface TaskNote { 'note' : string, 'author' : Principal }
export type TaskState = { 'Open' : null } |
  { 'Closed' : null } |
  { 'Pending' : null };
export interface VotingPower { 'spirit' : bigint, 'health' : bigint }
export interface _SERVICE {
  'accept_proposal' : ActorMethod<
    [bigint, [] | [string], [] | [string], [] | [string]],
    Result
  >,
  'add_account' : ActorMethod<[Account], undefined>,
  'add_task_note' : ActorMethod<[bigint, string], Result>,
  'claim_task' : ActorMethod<[bigint], Result>,
  'complete_task' : ActorMethod<[bigint, boolean], Result>,
  'get_account' : ActorMethod<[[] | [Principal]], Account>,
  'get_proposal' : ActorMethod<[bigint], Proposal>,
  'get_task' : ActorMethod<[bigint], Task>,
  'judge_claimant' : ActorMethod<[bigint, bigint, number], Result>,
  'list_accounts' : ActorMethod<[], Array<Account>>,
  'list_proposals' : ActorMethod<[], Array<Proposal>>,
  'list_tasks' : ActorMethod<[], Array<Task>>,
  'open_task' : ActorMethod<[bigint], Result>,
  'rate_task' : ActorMethod<[bigint, VotingPower], Result>,
  'reject_proposal' : ActorMethod<[bigint, [] | [string]], Result>,
  'submit_proposal' : ActorMethod<[string, string, string, boolean], Result_1>,
  'submit_task' : ActorMethod<[string, string, VotingPower], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
