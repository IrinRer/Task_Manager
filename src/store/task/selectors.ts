import { RootState } from 'store';

function isCreate(element, index) {
      if (element.name !== "Создана") {
        return false;
      }
    return {task_status_id: element.task_status_id, name: element.name};
  }

export const getTask = (state: RootState) => state.onetask.response;
export const getTaskLoading = (state: RootState) => state.onetask.loading;
export const getTaskError = (state: RootState) => state.onetask.error;

export const getDataCreate = (state: RootState) => state.onetask.data;
export const getTitle = (state: RootState) => state.onetask.data.title;
export const getDescription = (state: RootState) => state.onetask.data.description;
export const getDefaultStatus = (state: RootState) => state.onetask.statuses?.find(isCreate);
export const getDefaultStatusName = (state: RootState) => state.onetask.statuses?.find(isCreate)?.name;
export const getDefaultStatusId = (state: RootState) => state.onetask.statuses?.find(isCreate)?.task_status_id;