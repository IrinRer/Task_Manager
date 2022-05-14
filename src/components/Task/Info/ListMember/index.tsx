import { SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import {
  getNewSelectedMembers,
  getUnselectedMembers,
  getTaskId,
  getTaskWatchersID,
  getTaskWatchers,
} from 'store/editTask/selectors';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  setNewSelectedMembers,
  setUnselectedMembers,
} from 'store/editTask/slice';
import {
  deleteTaskMemberAction,
  setTaskMemberAction,
} from 'store/editTask/thunk';
import { IUser } from 'store/users/types';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import styles from '../AddMemberButton/index.module.scss';
import SimpleSelect from '../../../Common/SimpleSelect';
import useSelectOptions from '../TaskHook/useSelectOptions';

type TRoleData = {
  name: string;
  roleId: string;
  users: IUser[];
  usersID: string[];
};

type TProps = {
  roleName: string;
};

const ListMemberMulti: FC<TProps> = ({ roleName }) => {
  const options = useSelectOptions();
  const watchers = useAppSelector(getTaskWatchers);
  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);

  const RoleData: Array<TRoleData> = [
    {
      name: 'Наблюдатель',
      roleId: watcherRoleID || '',
      users: watchers,
      usersID: watchersID,
    },
  ];

  const usersData = RoleData.find((el) => {
    return el.name === roleName;
  });

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
      <SimpleSelect
        list={usersData?.users || null}
        itemKey="key"
        itemLabel="name"
        itemValue="user_id"
        {...options}
        dropdownClassName={styles.dropdown}
        defaultValue={usersData?.usersID}
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
      />
    </div>
  );
};

export default ListMemberMulti;
