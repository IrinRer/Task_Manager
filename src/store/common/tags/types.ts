import { AxiosError } from 'axios';
import { TagColor } from 'constants/types/common';

export const COMMON_TAGS_SLICE_ALIAS = 'common/tags';

export interface ICommonTagsReducer {
  tags: Array<ITag>;
  initialTag:  Array<ITag>;
  loading: boolean;
  error: AxiosError | null;
  sentTag?: Array<ITag>;
  tag_delete?: string | null;
}

export interface ITag {
  task_tag_id: string;
  name: string;
  color: TagColor;
  created?: string;
  updated?: string;
}

export interface IPopulatedTag extends ITag {
  key: string | undefined;
}
