import { RootState } from 'store';
import { ITaskMembers, ITaskRoles } from './types';

function isCreate(element, index) {
      if (element.name !== "Создана") {
        return false;
      }
    return {task_status_id: element.task_status_id, name: element.name};
  }

function isAuthor(element, index) {
    if (element.task_role.name!== "Автор задачи") {
      return false;
    }
  return {element};
}

function isWatcher(element, index) {
  if (element.task_role.name!== "Наблюдатель") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function isResponsible(element, index) {
  if (element.task_role.name!== "Ответственный") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function getNameFromRoles(obj:ITaskRoles[]/* ITaskReducer["data"]["roles"] */){
  // eslint-disable-next-line prefer-const
  let arr:string[] = [];
  obj.forEach (element => arr.push( element.assign_user.name));
  return arr;
}

function getNameFromMembers(obj:ITaskMembers[]){
  // eslint-disable-next-line prefer-const
  let arr:any[] = [];
  obj.forEach (element => arr.push( {
    user_id:element.user_id,
    name:element.name,
    logo: element.logo,
  }));
  return arr;
}

export const getTask = (state: RootState) => state.onetask.data;
export const getTaskLoading = (state: RootState) => state.onetask.loading;
export const getTaskError = (state: RootState) => state.onetask.error;
export const getTaskStatus = (state: RootState) => state.onetask.data.status.name;
export const getTaskAuthor = (state: RootState) => state.onetask.data.roles?.find(isAuthor)?.assign_user;
export const getTaskWatchers = (state: RootState) => getNameFromRoles(state.onetask.data.roles?.filter(isWatcher));
export const getTaskResponsible = (state: RootState) => state.onetask.data.roles?.find(isResponsible)?.assign_user;

export const getMembers = (state: RootState) => getNameFromMembers(state.onetask.members);

export const getDataCreate = (state: RootState) => state.onetask.data;
export const getTitle = (state: RootState) => state.onetask.data.title;
export const getDescription = (state: RootState) => state.onetask.data.description;

export const getDefaultStatus = (state: RootState) => state.onetask.statuses?.find(isCreate);
export const getDefaultStatusName = (state: RootState) => state.onetask.statuses?.find(isCreate)?.name;
export const getDefaultStatusId = (state: RootState) => state.onetask.statuses?.find(isCreate)?.task_status_id;

export const getTaskId = (state: RootState) => state.onetask.data.task_id;