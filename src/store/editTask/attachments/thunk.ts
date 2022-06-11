import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { ATTACHMENTS_SLICE_ALIAS, IFileThunk } from './types';

export const assignFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/create-assign`,
  async (file: IFileThunk, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file.fileList || '');

      const responseCreate: AxiosResponse = await api().post(
        `/api/v1.0/storage/files`,
        { name_original: file.fileList?.name },
      );

      const responseFile = await api().post(
        `/api/v1.0/storage/files/${responseCreate.data.data.storage_file_id}/upload`,
        formData,
        file.configProgressBar,
      );

      await api().post(
        `/api/v1.0/task/tasks/${file.taskId}/storage-file-assign`,
        { storage_file_id: responseCreate.data.data.storage_file_id },
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

export const deleteFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/delete`,
  async (file: IFileThunk, { rejectWithValue }) => {
    try {
      await api().post(
        `/api/v1.0/task/tasks/${file.taskId}/storage-file-un-assign`,
        { storage_file_id: file.fileId },
      );

      notification.success({ message: 'Файл успешно удален' });

      // нужно, чтобы удалить из store те вложения, которые удалились
      // response.data возвращает целую задачу
      return file.name;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления файла' });
      return rejectWithValue(error);
    }
  },
);

export const downloadFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/download`,
  async (file: IFileThunk, { rejectWithValue }) => {
    try {
      const response = await api().get(
        `/api/v1.0/storage/files/${file.fileId}/download`,
        { responseType: 'blob' },
      );
      const link = document.createElement('a');
      const url = URL.createObjectURL(response.data);
      link.setAttribute('download', file.name || '');
      link.href = url;
      link.click();
      URL.revokeObjectURL(link.href);

      return response.data;
    } catch (error) {
      notification.error({ message: 'Ошибка скачивания файла' });
      return rejectWithValue(error);
    }
  },
);

export const viewFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/view`,
  async (file: IFileThunk, { rejectWithValue }) => {
    try {
      const response = await api().get(
        `/api/v1.0/storage/files/${file.fileId}/download`,
        { responseType: 'blob' },
      );

      return { url: URL.createObjectURL(response.data), name: file.name };
    } catch (error) {
      notification.error({ message: 'Ошибка скачивания файла' });
      return rejectWithValue(error);
    }
  },
);
