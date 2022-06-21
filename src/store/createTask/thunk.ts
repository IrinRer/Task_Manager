import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ROLES } from 'constants/types/common';
import { RootState } from 'store';
import { getResponsibleRoleID } from 'store/common/roles/selectors';
import { getTaskAuthorIDParams } from 'store/tasks/selectors';
import { addTask } from 'store/tasks/slice';
import { api } from '../../network';
import {
  CREATE_TASK_SLICE_ALIAS,
  ICreateTaskArg,
  ICloneTaskArg,
} from './types';

export const createTaskAction = createAsyncThunk(
  `${CREATE_TASK_SLICE_ALIAS}/createTask`,
  async (arg: ICreateTaskArg, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api().post(`/api/v1.0/task/tasks`, {
        title: arg.title,
        task_status_id: arg.task_status_id,
      });
      dispatch(addTask(response.data.data));
      return response.data.data;

      // Назначаем автора ответственным
      /* const state = getState() as RootState;
      const responsibleRoleID = getResponsibleRoleID(state);
      const author_id = getTaskAuthorIDParams(state, response.data.data);

      const responseResponsible = await api().post(
        `/api/v1.0/task/tasks/${response.data.data.task_id}/role-assign`,
        {
          assign_user_id: author_id,
          task_role_id: responsibleRoleID,
        },
      );
      dispatch(addTask(responseResponsible.data.data));
      return responseResponsible.data.data; */
    } catch (error) {
      notification.error({ message: 'Ошибка создания задачи' });
      return rejectWithValue(error.message);
    }
  },
);

export const cloneTaskAction = createAsyncThunk(
  `${CREATE_TASK_SLICE_ALIAS}/cloneTask`,
  async (args: ICloneTaskArg, { rejectWithValue, getState, dispatch }) => {
    try {
      // Клонируем задачу
      const response = await api().post(
        `/api/v1.0/task/tasks/${args.id}/clone`,
        {},
      );
      let task = { ...response.data.clone };
      // Удаляем всех кроме автора
      response.data.clone.roles.forEach(async (role) => {
        if (role.task_role.name !== ROLES.author && task.roles.length > 1) {
          const roleResponse = await api().post(
            `/api/v1.0/task/tasks/${response.data.clone.task_id}/role-unassign`,
            {
              task_role_id: role.task_role.task_role_id,
              assign_user_id: role.assign_user.user_id,
            },
          );
          task = { ...roleResponse.data.data };
        }
      });

      /* const state = getState() as RootState;
      const responsibleRoleID = getResponsibleRoleID(state);
      const author_id = getTaskAuthorIDParams(state, task);

      const responseResponsible = await api().post(
        `/api/v1.0/task/tasks/${task.task_id}/role-assign`,
        {
          task_role_id: responsibleRoleID,
          assign_user_id: author_id,
        },
      ); */

      // Назначаем автора ответственным
      const responseResponsible = await api().post(
        `/api/v1.0/task/tasks/${task.task_id}/role-assign`,
        {
          task_role_id: task.roles[1].task_role.task_role_id,
          assign_user_id: task.roles[0].assign_user.user_id,
        },
      );

      // Пишем в таски чтоб не обновлять список с бэкэнда
      dispatch(addTask(responseResponsible.data.data));
      notification.success({ message: 'Копия задачи создана' });
      return { task: responseResponsible.data.data, edit: args.edit };
    } catch (error) {
      notification.error({ message: 'Ошибка дублирования задачи' });
      return rejectWithValue(error.message);
    }
  },
);
