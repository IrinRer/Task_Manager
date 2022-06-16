import { AxiosError } from 'axios';
import { ITag } from '../../../common/tags/types';

export const TAG_SLICE_ALIAS = 'tag';

export interface ITagReducer {
  sentTag: Array<ITag>;
  loading: boolean;
  error: AxiosError | null;
}

export interface ITagPayload {
  responseCreate: ITag;
}

export interface ITagThunkEditCreat {
  arg: {
    taskId?: string;
    tagId?: string;
  };
  name: string;
  color: string;
}

export interface ITagThunkAssignTag {
  task_tag_id: string;
  task_id: string;
  name: string;
  color?: string;
}