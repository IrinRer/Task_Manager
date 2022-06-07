import { AxiosError } from 'axios';
import { ITag } from '../../../common/tags/types';

export const TAG_SLICE_ALIAS = 'tag';

export interface ITagReducer {
  sentTag: Array<ITag> | undefined;
  loading: boolean;
  error: AxiosError | null;
}

export interface ITagPayload {
  responseCreate: ITag;
}

export interface ITagThunk {
  task_tag_id?: string;
  name?: string;
  color?: string;
  task_id: string | undefined;
}
