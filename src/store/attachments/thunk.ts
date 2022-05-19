import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { ATTACHMENTS_SLICE_ALIAS } from './types';

export const createPlaceFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/create`,
  async (file: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file.fileList);
    
      const responseCreate: AxiosResponse = await api().post(
        `/api/v1.0/storage/files`,
        { name_original: file.fileList.name },
      );

      const responseFail = await api().post(
        `/api/v1.0/storage/files/${responseCreate.data.data.storage_file_id}/upload`,
        formData,
        file.config,
      );

      file.onSuccess('Ok');
      return responseFail.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления файла' });
      file.onError({ error });
      return rejectWithValue(error);
    }
  },
);
