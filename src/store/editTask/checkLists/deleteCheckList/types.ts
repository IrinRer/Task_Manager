import { AxiosError } from 'axios';

export const DELETE_CHECKLIST_SLICE_ALIAS = 'deleteCheckList';

export interface IDeleteCheckListReducer {
  isLoading: boolean;
  error: AxiosError | null;
}
