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
import styles from '../AddMemberButton/index.module.scss';
import SimpleSelect from '../../../Common/SimpleSelect';
import useSelectOptions from '../TaskHook/useSelectOptions';
import useMembersProps from '../MembersHook/useMembersProps';

type TProps = {
  roleName: string;
};

const AddMemberButtonMulti: FC<TProps> = ({ roleName }) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const options = useSelectOptions();
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);
  const roleUnassign = useAppSelector(getUnselectedMembers);

  const usersData = useMembersProps(roleName);
  const selectedMembers = usersData?.usersID;
  const roleId = usersData?.roleId;

  const isNewUser = (users: string[] | string, elem: string) => {
    return users?.indexOf(elem) === -1;
  };

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string[]) => {
    if (selectedMembers && Array.isArray(selectedMembers)) {
      dispatch(
        setNewSelectedMembers(
          value.filter((elem: string) => isNewUser(selectedMembers, elem)),
        ),
      );
      dispatch(
        setUnselectedMembers(
          selectedMembers.filter((elem: string) => isNewUser(value, elem)),
        ),
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

  return (
    <div className={styles.addmemberWrapper}>
      {!isVisible ? (
        <Button className={styles.addmember} onClick={showMemberModal}>
          + добавить участника
        </Button>
      ) : null}

      {isVisible ? (
        <SimpleSelect
          list={allUsers}
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
