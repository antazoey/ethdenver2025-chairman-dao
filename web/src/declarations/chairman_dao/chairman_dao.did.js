export const idlFactory = ({ IDL }) => {
  const Claim = IDL.Record({
    'account' : IDL.Principal,
    'percentage' : IDL.Float64,
  });
  const VotingPower = IDL.Record({
    'spirit' : IDL.Nat64,
    'health' : IDL.Nat64,
  });
  const TaskState = IDL.Variant({
    'Open' : IDL.Null,
    'Closed' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const TaskNote = IDL.Record({ 'note' : IDL.Text, 'author' : IDL.Principal });
  const Task = IDL.Record({
    'id' : IDL.Nat64,
    'claims' : IDL.Vec(Claim),
    'title' : IDL.Text,
    'ratings' : IDL.Vec(IDL.Tuple(IDL.Principal, VotingPower)),
    'description' : IDL.Text,
    'state' : TaskState,
    'notes' : IDL.Vec(TaskNote),
    'voting_power' : VotingPower,
  });
  const Payout = IDL.Record({
    'timestamp' : IDL.Nat64,
    'voting_power' : VotingPower,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'voting_power' : VotingPower,
    'payouts' : IDL.Vec(Payout),
  });
  const ProposalState = IDL.Variant({
    'Open' : IDL.Null,
    'Rejected' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat64,
    'new_description' : IDL.Opt(IDL.Text),
    'title' : IDL.Text,
    'description' : IDL.Text,
    'state' : ProposalState,
    'completion_notes' : IDL.Opt(IDL.Text),
    'new_title' : IDL.Opt(IDL.Text),
    'notes' : IDL.Text,
    'health_only' : IDL.Bool,
  });
  const ChairmanDaoStableStorage = IDL.Record({
    'tasks' : IDL.Vec(Task),
    'accounts' : IDL.Vec(Account),
    'proposals' : IDL.Vec(Proposal),
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  return IDL.Service({
    'accept_proposal' : IDL.Func(
        [IDL.Nat64, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result],
        [],
      ),
    'add_account' : IDL.Func([Account], [], []),
    'add_task_note' : IDL.Func([IDL.Nat64, IDL.Text], [Result], []),
    'claim_task' : IDL.Func([IDL.Nat64], [Result], []),
    'complete_task' : IDL.Func([IDL.Nat64, IDL.Bool], [Result], []),
    'get_account' : IDL.Func([IDL.Opt(IDL.Principal)], [Account], ['query']),
    'get_proposal' : IDL.Func([IDL.Nat64], [Proposal], ['query']),
    'get_task' : IDL.Func([IDL.Nat64], [Task], ['query']),
    'judge_claimant' : IDL.Func(
        [IDL.Nat64, IDL.Nat64, IDL.Float64],
        [Result],
        [],
      ),
    'list_accounts' : IDL.Func([], [IDL.Vec(Account)], ['query']),
    'list_proposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    'list_tasks' : IDL.Func([], [IDL.Vec(Task)], ['query']),
    'open_task' : IDL.Func([IDL.Nat64], [Result], []),
    'rate_task' : IDL.Func([IDL.Nat64, VotingPower], [Result], []),
    'reject_proposal' : IDL.Func([IDL.Nat64, IDL.Opt(IDL.Text)], [Result], []),
    'submit_proposal' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Bool],
        [Result_1],
        [],
      ),
    'submit_task' : IDL.Func([IDL.Text, IDL.Text, VotingPower], [Result_1], []),
  });
};
export const init = ({ IDL }) => {
  const Claim = IDL.Record({
    'account' : IDL.Principal,
    'percentage' : IDL.Float64,
  });
  const VotingPower = IDL.Record({
    'spirit' : IDL.Nat64,
    'health' : IDL.Nat64,
  });
  const TaskState = IDL.Variant({
    'Open' : IDL.Null,
    'Closed' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const TaskNote = IDL.Record({ 'note' : IDL.Text, 'author' : IDL.Principal });
  const Task = IDL.Record({
    'id' : IDL.Nat64,
    'claims' : IDL.Vec(Claim),
    'title' : IDL.Text,
    'ratings' : IDL.Vec(IDL.Tuple(IDL.Principal, VotingPower)),
    'description' : IDL.Text,
    'state' : TaskState,
    'notes' : IDL.Vec(TaskNote),
    'voting_power' : VotingPower,
  });
  const Payout = IDL.Record({
    'timestamp' : IDL.Nat64,
    'voting_power' : VotingPower,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'voting_power' : VotingPower,
    'payouts' : IDL.Vec(Payout),
  });
  const ProposalState = IDL.Variant({
    'Open' : IDL.Null,
    'Rejected' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat64,
    'new_description' : IDL.Opt(IDL.Text),
    'title' : IDL.Text,
    'description' : IDL.Text,
    'state' : ProposalState,
    'completion_notes' : IDL.Opt(IDL.Text),
    'new_title' : IDL.Opt(IDL.Text),
    'notes' : IDL.Text,
    'health_only' : IDL.Bool,
  });
  const ChairmanDaoStableStorage = IDL.Record({
    'tasks' : IDL.Vec(Task),
    'accounts' : IDL.Vec(Account),
    'proposals' : IDL.Vec(Proposal),
  });
  return [ChairmanDaoStableStorage];
};
