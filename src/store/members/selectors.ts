import { RootState } from 'store';

/* function getNameFromMembers(obj:Array<ITaskMembers>|null){
  // eslint-disable-next-line prefer-const
  let arr:IAssignUser[] = [];
  obj?.forEach (element => arr.push( {
    user_id:element.user_id,
    name:element.name,
    logo: element.logo,
  }));
  return arr;
} */

export const getMembersLoading = (state: RootState) => state.members.loading;
export const getMembersError = (state: RootState) => state.members.error;
export const getMembers = (state: RootState) => state.members.members;