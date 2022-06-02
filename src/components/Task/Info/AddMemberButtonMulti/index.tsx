import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useContext, useMemo, useState } from 'react';

import {
  getNewSelectedMembers,
  getUnselectedMembers,
  getTaskId,
} from 'store/editTask/selectors';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  setNewSelectedMembers,
  setUnselectedMembers,
} from 'store/editTask/slice';
import {
  deleteTaskMemberGroupAction,
  setTaskMemberGroupAction,
} from 'store/editTask/thunk';
import { selectPopulatedUsers } from 'store/users/selectors';
import { IPopulatedUser } from 'store/users/types';
import SimpleSelect from 'components/Common/SimpleSelect';
import { ROLES } from 'constants/types/common';
import { RoleContext } from 'constants/common';
import styles from '../AddMemberButton/index.module.scss';
import useSelectOptions from '../TaskHook/useSelectOptions';
import useMembersProps from '../MembersHook/useMembersProps';

type TProps = {
  usersMaxCount: number;
};

const AddMemberButtonMulti: FC<TProps> = ({ usersMaxCount }) => {
  const roleName = useContext(RoleContext);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const options = useSelectOptions();
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);
  const roleUnassign = useAppSelector(getUnselectedMembers);

  const usersData = useMembersProps(roleName);
  const selectedMembers = usersData?.usersID;
  const roleId = usersData?.roleId;
  const watcherRoleId = useMembersProps(ROLES.watcher)?.roleId;

  const isNewUser = (users: Array<string> | string, elem: string) => {
    return users?.indexOf(elem) === -1;
  };

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const addNewMembersToArr = (
    countSelectedMembers: number,
    newSelectedMembers: Array<string>,
    newUnselectedMembers: Array<string>,
  ) => {
    if (countSelectedMembers > usersMaxCount) {
      setIsDisabled(true);
    }
    if (countSelectedMembers === usersMaxCount) {
      setIsDisabled(true);
      dispatch(setNewSelectedMembers(newSelectedMembers));
      dispatch(setUnselectedMembers(newUnselectedMembers));
    }
    if (countSelectedMembers < usersMaxCount) {
      setIsDisabled(false);
      dispatch(setNewSelectedMembers(newSelectedMembers));
      dispatch(setUnselectedMembers(newUnselectedMembers));
    }
  };

  const onChange = (value: Array<string>) => {
    if (selectedMembers) {
      const newSelectedMembers = value.filter((elem: string) =>
        isNewUser(selectedMembers, elem),
      );
      const newUnselectedMembers = selectedMembers.filter((elem: string) =>
        isNewUser(value, elem),
      );

      const countSelectedMembers =
        selectedMembers.length +
        newSelectedMembers.length -
        newUnselectedMembers.length;

      addNewMembersToArr(
        countSelectedMembers,
        newSelectedMembers,
        newUnselectedMembers,
      );
    }
  };

  const onBlur = () => {
    options.common.onBlur();
    setIsVisible(!isVisible);
    if (
      Array.isArray(roleAssign) &&
      Array.isArray(roleUnassign) &&
      taskId &&
      roleId &&
      watcherRoleId
    ) {
      dispatch(
        setTaskMemberGroupAction({
          task_id: taskId,
          assign_users_ids: roleAssign,
          task_role_id: roleId,
          watcher_role_id: watcherRoleId,
        }),
      );
      dispatch(
        deleteTaskMemberGroupAction({
          task_id: taskId,
          assign_users_ids: roleUnassign,
          task_role_id: roleId,
          watcher_role_id: watcherRoleId,
        }),
      );
      dispatch(setNewSelectedMembers([]));
      dispatch(setUnselectedMembers([]));
    }
  };

  const selectedMembersWithNew = useMemo(() => {
    if (selectedMembers) {
      return selectedMembers
        .concat(roleAssign || [])
        .filter((elem: string) =>
          roleUnassign ? isNewUser(roleUnassign, elem) : true,
        );
    }
    return null;
  }, [roleAssign, roleUnassign, selectedMembers]);

  const getOnlySelectedUsers = useMemo(() => {
    return allUsers.filter((el) => {
      return !isNewUser(selectedMembersWithNew || [], el.user_id);
    });
  }, [allUsers, selectedMembersWithNew]);

  return (
    <div className={styles.addmemberWrapper}>
      {isVisible ? (
        <SimpleSelect
          {...options.common}
          list={isDisabled ? getOnlySelectedUsers : allUsers}
          itemKey="key"
          itemLabel="name"
          itemValue="user_id"
          mode="multiple"
          dropdownClassName={styles.dropdown}
          defaultValue={selectedMembersWithNew}
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
          onSearch={options.particular.handleSearch}
        />
      ) : (
        <Button className={styles.addmember} onClick={showMemberModal}>
          + добавить участника
        </Button>
      )}
    </div>
  );
};

export default AddMemberButtonMulti;
