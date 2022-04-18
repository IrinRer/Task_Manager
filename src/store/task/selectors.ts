import { RootState } from 'store';
import { ITaskMembers, ITaskRoles } from './types';

function isAuthor(element) {
    if (element.task_role.name!== "Автор задачи") {
      return false;
    }
  return {element};
}

function isWatcher(element) {
  if (element.task_role.name!== "Наблюдатель") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function isImplementer(element) {
  if (element.task_role.name!== "Исполнитель") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function isWatcherFromRoles(element) {
  if (element.name!== "Наблюдатель") {
    return false;
  }
  return element;
}

function isResponsible(element) {
  if (element.task_role.name!== "Ответственный") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function getUsersFromRoles(obj:Array<ITaskRoles>|undefined){
  // eslint-disable-next-line prefer-const
  let arr:any[] = [];
  obj?.forEach(element => arr.push( element.assign_user));
  return arr;
}

function getUsersIdFromRoles(obj:Array<ITaskRoles>|undefined){
  // eslint-disable-next-line prefer-const
  let arr:Array<string>= [];
  obj?.forEach(element => {
    arr.push(element.assign_user.user_id);
  });
  return arr/* .join(',') */;
}

function getNameFromMembers(obj:Array<ITaskMembers>|null){
  // eslint-disable-next-line prefer-const
  let arr:any[] = [];
  obj?.forEach (element => arr.push( {
    user_id:element.user_id,
    name:element.name,
    logo: element.logo,
  }));
  return arr;
}

export const getTask = (state: RootState) => state.onetask.data;
export const getTaskLoading = (state: RootState) => state.onetask.loading;
export const getTaskError = (state: RootState) => state.onetask.error;

export const getDataCreate = (state: RootState) => state.onetask.data;
export const getTitle = (state: RootState) => state.onetask.data?.title;
export const getDescription = (state: RootState) => state.onetask.data?.description;
export const getTaskStatus = (state: RootState) => state.onetask.data?.status.name;
export const getMembers = (state: RootState) => getNameFromMembers(state.onetask?.members);

export const getTaskWatchers = (state: RootState) => getUsersFromRoles(state.onetask.data?.roles?.filter(isWatcher));
export const getTaskWatchersID = (state: RootState) =>getUsersIdFromRoles(state.onetask.data?.roles?.filter(isWatcher));
export const getWatcherRoleID = (state: RootState) =>state.onetask.allroles?.find(isWatcherFromRoles)?.task_role_id;

export const getNewSelectedMembers = (state: RootState) => state.onetask?.selectedMembers; 
export const getUnselectedMembers = (state: RootState) => state.onetask?.unselectedMembers; 

export const getTaskAuthor = (state: RootState) => state.onetask.data?.roles?.find(isAuthor)?.assign_user;
export const getTaskResponsible = (state: RootState) => state.onetask.data?.roles?.find(isResponsible)?.assign_user;
export const getTaskImplementer = (state: RootState) => state.onetask.data?.roles?.find(isImplementer)?.assign_user;

/* function isCreate(element) {
  if (element.name !== "Создана") {
    return false;
  }
return {task_status_id: element.task_status_id, name: element.name};
} */
// export const getDefaultStatus = (state: RootState) => state.onetask.statuses?.find(isCreate);
// export const getDefaultStatusName = (state: RootState) => state.onetask.statuses?.find(isCreate)?.name;
// export const getDefaultStatusId = (state: RootState) => state.onetask.statuses?.find(isCreate)?.task_status_id;

export const getTaskId = (state: RootState) => state.onetask.data?.task_id;