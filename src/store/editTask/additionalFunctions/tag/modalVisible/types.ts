export const MODAL_VISIBLE_SLICE_ALIAS = 'modalVisible';

export interface IModalVisibleReducer {
  isModalVisibleMain: boolean;
  isModalVisibleCreate: boolean;
  isModalVisibleEdit: boolean;
  isModalVisibleDelete: boolean;
}
