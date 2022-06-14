import { AxiosError } from 'axios';

export const SET_CHECKLIST_ITEM_POSITION_SLICE_ALIAS =
  'setCheckListItemPosition';

export interface ISetCheckListItemPositionReducer {
  draggedItemId: string;
  isLoading: boolean;
  error: AxiosError | null;
}
