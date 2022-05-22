import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { ATTACHMENTS_SLICE_ALIAS, IFileThunk } from './types';

export const createPlaceFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/create-assign`,
  async (file: IFileThunk, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file.fileList);

      const responseCreate: AxiosResponse = await api().post(
        `/api/v1.0/storage/files`,
        { name_original: file.fileList.name },
      );

      const responseFile = await api().post(
        `/api/v1.0/storage/files/${responseCreate.data.data.storage_file_id}/upload`,
        formData,
        file.config,
      );

      const responseAssignFile = await api().post(
        `/api/v1.0/task/tasks/{task_id}/storage-file-assign`,
        responseCreate.data.data.storage_file_id
      );

      file.onSuccess('Ok');
      return responseFile.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления файла' });
      file.onError({ error });
      return rejectWithValue(error);
    }
  },
);
