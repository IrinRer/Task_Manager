import { AxiosError } from 'axios';

export const DELETE_CHECKLIST_ITEM_SLICE_ALIAS = 'deleteCheckListItem';

export interface IDeleteCheckListItemReducer {
  isLoading: boolean;
  error: AxiosError | null;
}
