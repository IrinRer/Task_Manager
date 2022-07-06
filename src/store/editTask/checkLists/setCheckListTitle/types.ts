import { AxiosError } from 'axios';

export const SET_CHECKLIST_TITLE_SLICE_ALIAS = 'setCheckListTitle';

export interface ISetCheckListTitleReducer {
  isLoading: boolean;
  error: AxiosError | null;
}
