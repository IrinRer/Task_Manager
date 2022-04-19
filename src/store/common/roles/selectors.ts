import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { IRoles } from './types';


function isWatcherFromRoles(element:IRoles) {
    if (element.name!== "Наблюдатель") {
      return false;
    }
    return element;
  }
  
  function isResponsibleFromRoles(element:IRoles) {
    if (element.name!== "Ответственный") {
      return false;
    }
    return element;
  }
  function isImplementerFromRoles(element:IRoles) {
    if (element.name!== "Исполнитель") {
      return false;
    }
    return element;
  }


const allroles = (state: RootState) => state.common.roles.allroles;

export const getWatcherRoleID = createSelector(
    allroles,
    roles => roles?.find(isWatcherFromRoles)?.task_role_id
  );
  export const getResponsibleRoleID = createSelector(
    allroles,
    roles => roles?.find(isResponsibleFromRoles)?.task_role_id
  );
  export const getImplementerRoleID = createSelector(
    allroles,
    roles => roles?.find(isImplementerFromRoles)?.task_role_id
  );

  export const getRolesLoading = (state: RootState) => state.common.roles.loading;
export const getRolesError = (state: RootState) => state.common.roles.error;