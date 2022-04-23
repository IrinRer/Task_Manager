import { TProgress } from 'store/common/progresses/types';
import { ITag } from '../common/tags/types';
import { IUser } from '../users/types';

export const FILTERS_SLICE_ALIAS = 'filters';

export interface IFiltersReducer {
  searchQuery: string | null;
  users: Array<IUser>;
  statuses: Array<string>;
  tags: Array<ITag>;
  attachments: boolean;
  progress: TProgress;
  priorities: Array<string>;
}
