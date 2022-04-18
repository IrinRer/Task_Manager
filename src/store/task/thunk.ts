import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios from 'axios';

import { getBackendURL } from 'helpers/common';

import { ONETASK_SLICE_ALIAS, ONETASK_SLICE_CREATE, ONETASK_SLICE_STATUSES, ONETASK_SLICE_MEMBERS, ONETASK_SLICE_WATCHERS, ONETASK_SLICE_ROLES } from 'store/task/types';

// TODO: Доставать token необходимо из cookie
// const token =
// 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NDc1MjA1Njl9.lAA4ASRy8JglzDix1pFtaEqGztoJmQmumw6mknvrn8xS5cEiQ7fNLiAKqDJ1BMQ_dewhehcW7MSw5C8A9g2xwOrfp7AcXg6Ps0FSsgEamsVgwuBx4emaufL6PI0gp0S6CGH3PIrcaAzVAbKuvSVK8gU0sd5yH45CpQ3NvBA07XXBuIjKgLfCqHXJfKnpSp6u5M9YP2xE66wiY5GZFTXsjinwhhdw6XxSycmhWTqZYaJafaKhxU1YTaj8KpPrkjz5Xi-jRxEvoKvADDaXWlWHRd0fZ6eMnzQ5gDFIXH4Ce7M7_bupLN75xLMoRkkgAfgc9KDtiVhAXnwy2r_g667JKtsxBwGIIk8Yh7ZUC5jTXMg993_O_kMIfGaVpdvMvUDdiuZkZoMWKxF4NDyESVigDxRwXTzaM6lJjy0q2ESZf3r-p_nh87Kf6qiDX4zBpsa1_8U_I-x0sMWyXOCh762TS87dSZyvbNJGEet6cmJu2poAM2JnLJIHkxW-1n5euAqmutjkbXqQMTuwgzIBbCtoj8TCrFcTDH9xVtBAlwqnnoyBNpUgKnrPPzKXPmoVP7AQdp9j4p_B31f-Cgi3AszdP1UGHLoYcK5Thzy6715LBXjcFJR5pIFsni9Ho6ZuV4Qwvv9Od5C0RTfVq5PRvlvhxKWlK2_jsJ6pG5V90iWh_Sw';
const token =
'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NDg5OTI2MjZ9.MuWyldQKHxr1hAJ3gxsOxDDM9CvTvgCiE4f82s2fei1zcOUEn5k_AZ5iC43f8SIiDqlJdxd0KhlDruylfq4YIHpzmJ-qfmLXsoXbstTUAQIH84V0_CnhkZ_P8pEfOrkvmZeez5bJ8aK8bu0EXIFgulkxF7AT2KM_YQoRSPfrg8ZtqhhVyAuP43VLp4k0MKBe2FvrnMJBuIjrpf1LmXTVoHNdGzcyaA3gslIBARZ4K2puK4-ZORrGpybcK5jXhv97hpLet15xB5IV-Vb_TZnaES5E9UEKic_IWx23UdXloi3eBV9OHVw_kBwtgrGwdLveBh_YUHCGJ5yxs7cye7r4WWgofS7e1m_FQkPh0mzpfk5IqiUlg7eHa8gojJTAnIiYkzP2bi-TYaDNSeSBPPTui9UDmFYpCp5B5BfbU23qd1zq6OV9ccxezc6RJ8_BmmLtwBzF5htryanKBLoW4IXhxtpdywMi7zvPGA7EbIyerHlzI6TMnywkoFvDXElfD9TgkAhIsw2nG3Jl1ZQUUmHZxb02uNjFClvy01J7FCL7JzaJIyJDcANDIdBPRNst-ni2uZiprIqHl3gyw9ylgYODgU6cJuLVSsz6uCy9bhp1T0-425MhjCANQHfwQTbiuNksWP1MiPyXY4y-S3egEqw_CNSAfXlaqsx_8scIYXTyZ1g';    
// TODO: Вынести для переиспользования в других запросах

export const fetchTaskAction = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/fetchAll`,
  async (task_id: string, { rejectWithValue }) => {
    try {
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.get(`/api/v1.0/task/tasks/${task_id}`);
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(JSON.parse(JSON.stringify(error)));
    }
  },
);

export const createTaskAction = createAsyncThunk(
  `${ONETASK_SLICE_CREATE}/fetchAll`,
  async (taskdata:any, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.post(`/api/v1.0/task/tasks`, taskdata);
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);


export const setTaskDescription = createAsyncThunk(
  `${ONETASK_SLICE_CREATE}/setDescription`,
  async (data:{task_id, description}, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.post(`/api/v1.0/task/tasks/${data.task_id}/description-change`, {"description": data.description});
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);


export const setTaskTitle = createAsyncThunk(
  `${ONETASK_SLICE_CREATE}/setTitle`,
  async (data:{task_id, title}, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.post(`/api/v1.0/task/tasks/${data.task_id}/title-change`, {"title": data.title});
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);


export const fetchAllStatuses = createAsyncThunk(
  `${ONETASK_SLICE_STATUSES}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.get(`/api/v1.0/task/statuses`);
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);

export const fetchAllMembers = createAsyncThunk(
  `${ONETASK_SLICE_MEMBERS}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.get(`/api/v1.0/external/users?page=1&per_page=50`);
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);

export const setTaskWatchersAction = createAsyncThunk(
  `${ONETASK_SLICE_WATCHERS}/fetchAll`,
  async (data:{task_id, assign_user_id , task_role_id}, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.post(`/api/v1.0/task/tasks/${data.task_id}/role-assign`, {assign_user_id: data.assign_user_id, task_role_id: data.task_role_id});
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(JSON.parse(JSON.stringify(error)));
    }
  },
); 


export const deleteTaskWatchersAction = createAsyncThunk(
  `${ONETASK_SLICE_WATCHERS}/deleteWatcher`,
  async (data:{task_id, assign_user_id , task_role_id}, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.post(`/api/v1.0/task/tasks/${data.task_id}/role-unassign`, {assign_user_id: data.assign_user_id, task_role_id: data.task_role_id});
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(JSON.parse(JSON.stringify(error)));
    }
  },
);

export const fetchAllRoles = createAsyncThunk(
  `${ONETASK_SLICE_ROLES}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {     
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.get(`/api/v1.0/task/roles?page=1&per_page=50`);
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);