import { RootState } from 'store/index';

export const isClickedAttachments = (state: RootState) =>
  state.attachments.isClicked;
