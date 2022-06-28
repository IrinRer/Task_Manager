import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ROLES } from 'constants/types/common';
import { RootState } from 'store';
import {
  getResponsibleRoleID,
  getWatcherRoleID,
} from 'store/common/roles/selectors';
import { fetchTaskAction } from 'store/common/task/thunk';
import { setTaskMemberAction } from 'store/editTask/thunk';
import { getTaskAuthorIDParams } from 'store/tasks/selectors';
import { fetchTasksAction } from 'store/tasks/thunk';
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
      const task = { ...response.data.data };

      // Назначаем автора ответственным
      const state = getState() as RootState;
      const responsibleRoleID = getResponsibleRoleID(state);
      const author_id = getTaskAuthorIDParams(state, task);

      try {
        if (author_id && responsibleRoleID) {
          await dispatch(
            setTaskMemberAction({
              task_id: task.task_id,
              assign_user_id: author_id,
              task_role_id: responsibleRoleID,
            }),
          );
        }
      } catch (error) {
        if (error.response!.status !== 500) {
          notification.error({ message: 'Ошибка назначения участника' });
        } else {
          await dispatch(fetchTaskAction(task.task_id));
        }
        return rejectWithValue(error.message);
      }

      try {
        // Назначаем автора наблюдателем
        const watcherRoleID = getWatcherRoleID(state);
        if (author_id && watcherRoleID) {
          await dispatch(
            setTaskMemberAction({
              task_id: task.task_id,
              assign_user_id: author_id,
              task_role_id: watcherRoleID,
            }),
          );
        }
      } catch (error) {
        if (error.response!.status !== 500) {
          notification.error({ message: 'Ошибка назначения участника' });
        } else {
          await dispatch(fetchTaskAction(task.task_id));
        }
        return rejectWithValue(error.message);
      }

      // Обновляем список с бэкэнда
      await dispatch(fetchTasksAction());
      return response.data.data;
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

      // Назначаем автора ответственным
      const state = getState() as RootState;
      const responsibleRoleID = getResponsibleRoleID(state);
      const author_id = getTaskAuthorIDParams(state, task);

      try {
        if (author_id && responsibleRoleID) {
          await dispatch(
            setTaskMemberAction({
              task_id: task.task_id,
              assign_user_id: author_id,
              task_role_id: responsibleRoleID,
            }),
          );
        }
      } catch (error) {
        /* */
      }

      try {
        // Назначаем автора наблюдателем
        const watcherRoleID = getWatcherRoleID(state);
        if (author_id && watcherRoleID) {
          await dispatch(
            setTaskMemberAction({
              task_id: task.task_id,
              assign_user_id: author_id,
              task_role_id: watcherRoleID,
            }),
          );
        }
      } catch (error) {
        /* */
      }

      // Обновляем список с бэкэнда
      await dispatch(fetchTasksAction());
      return { task: response.data.clone, edit: args.edit };
    } catch (error) {
      notification.error({ message: 'Ошибка дублирования задачи' });
      return rejectWithValue(error.message);
    }
  },
);
