import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import {
  getNewSelectedMembers,
  getUnselectedMembers,
  getTaskId,
  getTaskWatchersID,
} from 'store/editTask/selectors';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import useSelectOptions from 'components/Task/Info/TaskHook/useSelectOptions';
import {
  setNewSelectedMembers,
  setUnselectedMembers,
} from 'store/editTask/slice';
import {
  deleteTaskMemberAction,
  setTaskMemberAction,
} from 'store/editTask/thunk';
import { IUser } from 'store/users/types';
import UsersOption from '../UsersOption';
import styles from '../AddMemberButton/index.module.scss';

type TProps = {
  roleId: string;
  users: IUser[];
  usersID: string[];
};

const ListMemberMulti: FC<TProps> = (props: TProps) => {
  const { roleId, users, usersID } = props;
  const options = useSelectOptions();
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);

  const onChange = (value: string[]) => {
    /* if (selectedMembers) {
      dispatch(
        setUnselectedMembers(
          selectedMembers.filter((elem: string) => isNewUser(value, elem)),
        ),
      );
      dispatch(
        deleteTaskMemberAction({
          task_id: taskId,
          assign_user_id: element,
          task_role_id: roleId,
        }),
      );
    } */
  };

  const onSearch = (query: string) => {
    // dispatch(fetchUsersAction(query));
  };

  const onBlur = () => {
   /* if (Array.isArray(roleAssign) && Array.isArray(roleUnassign) && taskId) {
      roleAssign?.forEach((element) => {
        dispatch(
          setTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId,
          }),
        );
      });
      roleUnassign?.forEach((element) => {
        dispatch(
          deleteTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId,
          }),
        );
      });
      dispatch(setNewSelectedMembers([]));
      dispatch(setUnselectedMembers([]));
    } */
  };

  return (
    <div className={styles.addmemberWrapper}>
      <Select<string[] | number | string, { value: string; children: string }>
          {...options}
          dropdownClassName={styles.dropdown}
          defaultValue={usersID}
          suffixIcon={
            <span
              role="img"
              aria-label="search"
              className="anticon anticon-search"
            >
              <SearchOutlined />
            </span>
          }
          onChange={onChange}
          onBlur={onBlur}
          onSearch={onSearch}
        >
          {/* <UsersOption users={ users } /> */}
        </Select>
    </div>
  );
};

export default ListMemberMulti;
