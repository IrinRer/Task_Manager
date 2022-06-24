import { AxiosError } from 'axios';

export const HISTORY_SLICE_ALIAS = 'history';

export interface IHistoryPayload {
  command_code: string;
  command_name: string;
  created: string;
  history_command_id: string;
  params: {};
  relations: [];
  user: {
    user_id: string;
    name: string;
    logo: string;
  };
}

export interface IHistoryReducer {
    data: Array<IHistoryPayload>;
    loading: boolean;
    error: AxiosError | null;
}
