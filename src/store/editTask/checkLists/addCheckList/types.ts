import { AxiosError } from 'axios';

export const ADD_CHECKLIST_SLICE_ALIAS = 'addCheckList';

export interface IAddCheckListReducer {
  isLoading: boolean;
  error: AxiosError | null;
}
