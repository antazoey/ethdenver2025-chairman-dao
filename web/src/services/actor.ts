import {
  canisterId,
  idlFactory,
  chairman_dao,
} from '../declarations/chairman_dao';
import { createReactor } from '@ic-reactor/react';

type Actor = typeof chairman_dao;

export const { useActorStore, useAuth, useQueryCall } = createReactor<Actor>({
  canisterId,
  idlFactory,
  host: 'https://localhost:4943',
});
