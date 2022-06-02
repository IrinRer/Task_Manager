import { AxiosError } from 'axios';
import { TagColor } from 'constants/types/common';

export const COMMON_TAGS_SLICE_ALIAS = 'common/tags';

export interface ICommonTagsReducer {
  tags: Array<ITag>;
  loading: boolean;
  error: AxiosError | null;
}

export interface ITag {
  task_tag_id?: string;
  name: string;
  color: TagColor;
  created?: Date;
  updated?: Date;
}

export interface IPopulatedTag extends ITag {
  value: string;
  key: string | undefined;
}
