import { AxiosError } from 'axios';

export const DATE_SLICE_ALIAS = 'date';

export interface IDateReducer {
  dateStart: string | null;
  dateStop: string | null;
  loading: boolean;
  error: AxiosError | null;
}

export interface IDate {
  dateStart: string | null;
  dateStop: string | null;
  task_id: string | undefined;
}
