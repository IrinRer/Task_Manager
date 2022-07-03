import { AxiosError } from 'axios';

export const HISTORY_SLICE_ALIAS = 'history';

export interface IHistoryItem {
  command_code: string;
  command_name: string;
  created: string;
  history_command_id: string;
  params: any;
  relations: [
    {
      relation_type: string;
      relation_id: string;
    },
  ];
  user: {
    user_id: string;
    name: string;
    logo: string;
  };
}

export interface IHistoryPayload {
  data: Array<IHistoryItem>;
  taskId: string;
  count: string;
}

export interface IHistoryReducer {
  data: Array<IHistoryItem>;
  name: string;
  attachments: Array<{ name: string; url: string, type: string, size: string }>;
  taskId: string;
  count: string;
  loading: boolean;
  error: AxiosError | null;
}

export interface IFileThunkHistory {
  type: string;
  fileId: string;
  name: string;
  size: string;
}