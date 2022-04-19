import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { IAssignUser } from 'store/members/types';
import { ITaskRoles } from './types';

function isAuthor(element:ITaskRoles) {
    if (element.task_role.name!== "Автор задачи") {
      return false;
    }
  return {element};
}

function isWatcher(element:ITaskRoles) {
  if (element.task_role.name!== "Наблюдатель") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function isImplementer(element:ITaskRoles) {
  if (element.task_role.name!== "Исполнитель") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}

function isResponsible(element:ITaskRoles) {
  if (element.task_role.name!== "Ответственный") {
    return false;
  }
  const el = element.assign_user.name;
  return {el};
}



function getUsersFromRoles(obj:Array<ITaskRoles>|undefined){
  // eslint-disable-next-line prefer-const
  let arr:IAssignUser[] = [];
  obj?.forEach(element => arr.push( element.assign_user));
  return arr;
}

function getUsersIdFromRoles(obj:Array<ITaskRoles>|undefined){
  // eslint-disable-next-line prefer-const
  let arr:Array<string>= [];
  obj?.forEach(element => {
    arr.push(element.assign_user.user_id);
  });
  return arr;
}

const taskData = (state: RootState) => state.onetask.data;
const taskRoles = (state: RootState) => state.onetask.data.roles;

export const getTaskId = createSelector(
  taskData,
  data => data.task_id
);
export const getTitle = createSelector(
  taskData,
  data => data.title
);
export const getDescription = createSelector(
  taskData,
  data => data.description
);
export const getTaskStatus = createSelector(
  taskData,
  data => data.status.name
);


export const getTaskAuthor = createSelector(
  taskRoles,
  roles => roles?.find(isAuthor)?.assign_user
);
export const getTaskResponsible = createSelector(
  taskRoles,
  roles => roles?.find(isResponsible)?.assign_user
);
export const getTaskImplementer = createSelector(
  taskRoles,
  roles => roles?.find(isImplementer)?.assign_user
);
export const getTaskWatchers = createSelector(
  taskRoles,
  roles => getUsersFromRoles(roles?.filter(isWatcher))
);
export const getTaskWatchersID = createSelector(
  taskRoles,
  roles => getUsersIdFromRoles(roles?.filter(isWatcher))
);


export const getTaskLoading = (state: RootState) => state.onetask.loading;
export const getTaskError = (state: RootState) => state.onetask.error;


// export const getTask = (state: RootState) => state.onetask.data;
// export const getWatcherRoleID = (state: RootState) =>state.onetask.allroles?.find(isWatcherFromRoles)?.task_role_id;
// export const getResponsibleRoleID = (state: RootState) =>state.onetask.allroles?.find(isResponsibleFromRoles)?.task_role_id;
// export const getImplementerRoleID = (state: RootState) =>state.onetask.allroles?.find(isImplementerFromRoles)?.task_role_id;

// export const getTaskId = (state: RootState) => state.onetask.data?.task_id;
// export const getTitle = (state: RootState) => state.onetask.data?.title;
// export const getDescription = (state: RootState) => state.onetask.data?.description;
// export const getTaskStatus = (state: RootState) => state.onetask.data?.status.name;

// export const getTaskAuthor = (state: RootState) => state.onetask.data?.roles?.find(isAuthor)?.assign_user;
// export const getTaskResponsible = (state: RootState) => state.onetask.data?.roles?.find(isResponsible)?.assign_user;
// export const getTaskImplementer = (state: RootState) => state.onetask.data?.roles?.find(isImplementer)?.assign_user;
// export const getTaskWatchers = (state: RootState) => getUsersFromRoles(state.onetask.data?.roles?.filter(isWatcher));
// export const getTaskWatchersID = (state: RootState) =>getUsersIdFromRoles(state.onetask.data?.roles?.filter(isWatcher));
// export const getTaskResponsibleID = (state: RootState) => state.onetask.data?.roles?.find(isResponsible)?.assign_user.user_id;
// export const getTaskImplementerID = (state: RootState) => state.onetask.data?.roles?.find(isImplementer)?.assign_user.user_id;

/* function isCreate(element) {
  if (element.name !== "Создана") {
    return false;
  }
return {task_status_id: element.task_status_id, name: element.name};
} */
// export const getDefaultStatus = (state: RootState) => state.onetask.statuses?.find(isCreate);
// export const getDefaultStatusName = (state: RootState) => state.onetask.statuses?.find(isCreate)?.name;
// export const getDefaultStatusId = (state: RootState) => state.onetask.statuses?.find(isCreate)?.task_status_id;