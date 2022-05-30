import { AxiosError } from 'axios';

export const ADD_CHECKLIST_ITEM_SLICE_ALIAS = 'addCheckListItem';

export interface IAddCheckListItemReducer {
  isLoading: boolean;
  error: AxiosError | null;
}
