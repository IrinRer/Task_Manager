import { AxiosError } from 'axios';

export const COMMON_TAGS_SLICE_ALIAS = 'common/tags';

export interface ICommonTagsReducer {
  tags: Array<ITag>;
  loading: boolean;
  error: AxiosError | null;
}

export interface ITag {
  task_tag_id?: string;
  name: string;
  color: string;
  created?: Date;
  updated?: Date;
}

export interface IPopulatedTag {
  task_tag_id?: string;
  name: string;
  color: string;
  created?: Date;
  updated?: Date;
  value: string;
  key: string | undefined;
}
