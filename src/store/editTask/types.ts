import { AxiosError } from 'axios';
import { IResponseTask } from 'store/common/task/types';

export const EDIT_TASK_SLICE_ALIAS = 'edittask';

export interface IEditTaskReducer {
  modalVisible: boolean;
  modalDeleteTaskVisible: boolean;
  data: IResponseTask | null;
  editLoading: {
    task: boolean;
    title: boolean;
    desc: boolean;
    members: boolean;
    status: boolean;
    membersGroup: boolean;
    checkList: boolean;
    checkListTitle: boolean;
    checkListItem: boolean;
  };
  selectedMembers: Array<string> | null;
  unselectedMembers: Array<string> | null;
  editError: {
    task: AxiosError | null;
    title: AxiosError | null;
    desc: AxiosError | null;
    setMembers: AxiosError | null;
    delMembers: AxiosError | null;
    status: AxiosError | null;
    setMembersGroup: AxiosError | null;
    delMembersGroup: AxiosError | null;
    checkList: AxiosError | null;
    checkListTitle: AxiosError | null;
    checkListItem: AxiosError | null;
  };
}

export interface ITaskAssignUser {
  task_id: string;
  assign_user_id: string;
  task_role_id: string;
}

export interface ITaskAssignGroupUser {
  task_id: string;
  assign_users_ids: Array<string>;
  task_role_id: string;
  watcher_role_id: string;
}

export interface ICheckListChangeCompleteStatus {
  check_list_item_id: string;
  complete: boolean;
}
