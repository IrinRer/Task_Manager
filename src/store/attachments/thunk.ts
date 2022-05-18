import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { ATTACHMENTS_SLICE_ALIAS } from './types';

export const createPlaceFile = createAsyncThunk(
  `${ATTACHMENTS_SLICE_ALIAS}/create`,
  async (data: any, { rejectWithValue }) => {
    try {
      const responseCreate: AxiosResponse = await api().post(
        `/api/v1.0/storage/files`,
        {name_original: data[0].name}
      );
      
      // const formData = new FormData(data.file);
      // formData.append('file', )
      //      // eslint-disable-next-line
      // debugger;

      const responseFile: AxiosResponse = await api().post(
        `/api/v1.0/storage/files/${responseCreate.data.data.storage_file_id}/upload`, data[0]
      );
      console.log(responseFile.data)
      return responseCreate.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления файла' });
      return rejectWithValue(error);
    }
  },
);

// export const createPlace = createAsyncThunk(
//   `${ATTACHMENTS_SLICE_ALIAS}/create`,
//   async (file: any, { rejectWithValue }) => {
//     try {
//       const responseCreate: AxiosResponse = await api().post(
//         `/api/v1.0/storage/files`,
//         {name_original: file.name}
//       );
//       const responseFile: AxiosResponse = await api().post(
//         `/api/v1.0/storage/files/${responseCreate.data.data.storage_file_id}/upload`
//       );
//       console.log(responseFile.data.data)
//       return await api().post(
//         `/api/v1.0/storage/files/${responseCreate.data.data.storage_file_id}/upload`
//       );
//     } catch (error) {
//       notification.error({ message: 'Ошибка добавления файла' });
//       return rejectWithValue(error);
//     }
//   },
// );