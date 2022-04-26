import { RootState } from 'store';

/* function getNameFromMembers(users:Array<ITaskMembers>|null){

  const arr:IAssignUser[] = users?.map(element => {
    user_id:element.user_id,
    name:element.name,
    logo: element.logo,
  }) || [];
  return arr;
} */

export const getMembersLoading = (state: RootState) => state.members.loading;
export const getMembersError = (state: RootState) => state.members.error;
export const getMembers = (state: RootState) => state.members.members;