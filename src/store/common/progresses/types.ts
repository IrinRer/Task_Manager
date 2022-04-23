import { AxiosError } from 'axios';

export const COMMON_PROGRESSES_SLICE_ALIAS = 'common/constants';

export interface ICommonProgressesReducer {
  progresses: Array<IProgress>;
  loading: boolean;
  error: AxiosError | null;
}

export interface IProgress {
  label: string;
  value: TProgress;
}

export type TProgress = 0 | 10 | 50;
