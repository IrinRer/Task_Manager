import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios from 'axios';

import { getBackendURL } from 'helpers/common';

import { ONETASK_SLICE_MEMBERS} from 'store/members/types';

// TODO: Доставать token необходимо из cookie
const token =
'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NDg5OTI2MjZ9.MuWyldQKHxr1hAJ3gxsOxDDM9CvTvgCiE4f82s2fei1zcOUEn5k_AZ5iC43f8SIiDqlJdxd0KhlDruylfq4YIHpzmJ-qfmLXsoXbstTUAQIH84V0_CnhkZ_P8pEfOrkvmZeez5bJ8aK8bu0EXIFgulkxF7AT2KM_YQoRSPfrg8ZtqhhVyAuP43VLp4k0MKBe2FvrnMJBuIjrpf1LmXTVoHNdGzcyaA3gslIBARZ4K2puK4-ZORrGpybcK5jXhv97hpLet15xB5IV-Vb_TZnaES5E9UEKic_IWx23UdXloi3eBV9OHVw_kBwtgrGwdLveBh_YUHCGJ5yxs7cye7r4WWgofS7e1m_FQkPh0mzpfk5IqiUlg7eHa8gojJTAnIiYkzP2bi-TYaDNSeSBPPTui9UDmFYpCp5B5BfbU23qd1zq6OV9ccxezc6RJ8_BmmLtwBzF5htryanKBLoW4IXhxtpdywMi7zvPGA7EbIyerHlzI6TMnywkoFvDXElfD9TgkAhIsw2nG3Jl1ZQUUmHZxb02uNjFClvy01J7FCL7JzaJIyJDcANDIdBPRNst-ni2uZiprIqHl3gyw9ylgYODgU6cJuLVSsz6uCy9bhp1T0-425MhjCANQHfwQTbiuNksWP1MiPyXY4y-S3egEqw_CNSAfXlaqsx_8scIYXTyZ1g';    
// TODO: Вынести для переиспользования в других запросах

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