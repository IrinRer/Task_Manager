import { TProgressValue } from 'store/common/progresses/types';
import { ITag } from 'store/common/tags/types';
import { IUser } from 'store/users/types';
import { AxiosError } from 'axios';

export const FILTERS_SLICE_ALIAS = 'filters';

export interface IFiltersReducer {
  currentState: IFilters;
  previousState: IFilters;
}

export interface IFilters {
  searchQuery: string;
  users: Array<IUser>;
  statuses: Array<string>;
  tags: Array<ITag>;
  attachments: boolean;
  progress: TProgressValue;
  priorities: Array<string>;
  usersInputValue: string;
  tagsInputValue: string;
  statusCounters: {
    counters: Array<IStatusCounter>;
    error: AxiosError | null;
    isLoading: boolean;
  };
}

export interface IStatusCounter {
  task_status_id: string;
  value: number;
}
