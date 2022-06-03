import { AxiosError } from 'axios';

export const SET_COMPLETE_CHECKLIST_ITEM_SLICE_ALIAS =
  'setCompleteCheckListItem';

export interface ISetCompleteCheckListItemReducer {
  isLoading: boolean;
  error: AxiosError | null;
}
