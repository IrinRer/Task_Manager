import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

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
  deleteTaskMemberAction,
  setTaskMemberAction,
} from 'store/editTask/thunk';
import { selectPopulatedUsers } from 'store/users/selectors';
import { IPopulatedUser } from 'store/users/types';
import { ROLES } from 'constants/task';
import styles from '../AddMemberButton/index.module.scss';
import SimpleSelect from '../../../Common/SimpleSelect';
import useSelectOptions from '../TaskHook/useSelectOptions';
import useMembersProps from '../MembersHook/useMembersProps';

type TProps = {
  roleName: string;
  usersMaxCount: number;
};

const AddMemberButtonMulti: FC<TProps> = ({ roleName, usersMaxCount }) => {
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

  const isNewUser = (users: string[] | string, elem: string) => {
    return users?.indexOf(elem) === -1;
  };

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string[]) => {
    if (selectedMembers && Array.isArray(selectedMembers)) {
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
    }
  };

  const onBlur = () => {
    options.common.onBlur();
    setIsVisible(!isVisible);
    if (
      Array.isArray(roleAssign) &&
      Array.isArray(roleUnassign) &&
      taskId &&
      roleId
    ) {
      roleAssign?.forEach((element) => {
        dispatch(
          setTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId,
          }),
        );
        if (roleName !== ROLES.watcher && watcherRoleId) {
          dispatch(
            setTaskMemberAction({
              task_id: taskId,
              assign_user_id: element,
              task_role_id: watcherRoleId,
            }),
          );
        }
      });
      roleUnassign?.forEach((element) => {
        dispatch(
          deleteTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId,
          }),
        );
        if (roleName !== ROLES.watcher && watcherRoleId) {
          dispatch(
            deleteTaskMemberAction({
              task_id: taskId,
              assign_user_id: element,
              task_role_id: watcherRoleId,
            }),
          );
        }
      });
      dispatch(setNewSelectedMembers([]));
      dispatch(setUnselectedMembers([]));
    }
  };

  const generateValue = () => {
    if (selectedMembers && Array.isArray(selectedMembers)) {
      return selectedMembers
        .concat(roleAssign || [])
        .filter((elem: string) =>
          roleUnassign ? isNewUser(roleUnassign, elem) : true,
        );
    }
    return null;
  };

  const getOnlySelectedUsers = () => {
    const selectedMembersWithNew = generateValue();

    return allUsers.filter((el) => {
      return !isNewUser(selectedMembersWithNew || [], el.user_id);
    });
  };

  return (
    <div className={styles.addmemberWrapper}>
      {!isVisible ? (
        <Button className={styles.addmember} onClick={showMemberModal}>
          + добавить участника
        </Button>
      ) : null}

      {isVisible ? (
        <SimpleSelect
          list={isDisabled ? getOnlySelectedUsers() : allUsers}
          itemKey="key"
          itemLabel="name"
          itemValue="user_id"
          {...options.common}
          mode="multiple"
          dropdownClassName={styles.dropdown}
          defaultValue={generateValue()}
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
      ) : null}
    </div>
  );
};

export default AddMemberButtonMulti;
