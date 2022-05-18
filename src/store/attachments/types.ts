import { AxiosError } from 'axios';

export const ATTACHMENTS_SLICE_ALIAS = 'attachments';

export interface IAttachmentsReducer {
  data: any,
  isClicked: boolean,
  loading: boolean,
  error: AxiosError | null,
}
