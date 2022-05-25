import { AxiosError } from 'axios';
import { IPriority } from 'store/common/priorities/types';

export const PRIORITY_SLICE_ALIAS = 'priority';

export interface IPriorityReducer {
  priority: IPriority | null;
  loading: boolean;
  error: AxiosError | null;
}

export interface IPriorityThunk {
  priority: string | null;
  task_id: string | undefined;
}
