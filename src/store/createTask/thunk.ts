import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ROLES } from 'constants/types/common';
import { RootState } from 'store';
import {
  getResponsibleRoleID,
  getWatcherRoleID,
} from 'store/common/roles/selectors';
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
      let result = response;

      // Назначаем автора ответственным
      const state = getState() as RootState;
      const responsibleRoleID = getResponsibleRoleID(state);
      const author_id = getTaskAuthorIDParams(state, response.data.data);
      try {
        const responseResponsible = await api().post(
          `/api/v1.0/task/tasks/${response.data.data.task_id}/role-assign`,
          {
            assign_user_id: author_id,
            task_role_id: responsibleRoleID,
          },
        );
        result = responseResponsible;
      } catch (error) {
        /* */
      }

      try {
        // Назначаем автора наблюдателем
        const watcherRoleID = getWatcherRoleID(state);
        const responseWatcher = await api().post(
          `/api/v1.0/task/tasks/${response.data.data.task_id}/role-assign`,
          {
            assign_user_id: author_id,
            task_role_id: watcherRoleID,
          },
        );
        result = responseWatcher;
      } catch (error) {
        /* */
      }
      dispatch(addTask(result.data.data));
      return result.data.data;
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
      let result = response;

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

      // Назначаем автора ответственным
      const state = getState() as RootState;
      const responsibleRoleID = getResponsibleRoleID(state);
      const author_id = getTaskAuthorIDParams(state, task);
      /// /await dispatch(setTaskMemberAction());
      try {
        const responseResponsible = await api().post(
          `/api/v1.0/task/tasks/${task.task_id}/role-assign`,
          {
            task_role_id: responsibleRoleID,
            assign_user_id: author_id,
          },
        );
        result = responseResponsible;
      } catch (error) {
        /* */
      }

      try {
        // Назначаем автора наблюдателем
        const watcherRoleID = getWatcherRoleID(state);
        const responseWatcher = await api().post(
          `/api/v1.0/task/tasks/${task.task_id}/role-assign`,
          {
            assign_user_id: author_id,
            task_role_id: watcherRoleID,
          },
        );
        result = responseWatcher;
      } catch (error) {
        /* */
      }

      // Пишем в таски чтоб не обновлять список с бэкэнда
      dispatch(addTask(result.data.data));
      return { task: result.data.data, edit: args.edit };
    } catch (error) {
      notification.error({ message: 'Ошибка дублирования задачи' });
      return rejectWithValue(error.message);
    }
  },
);
