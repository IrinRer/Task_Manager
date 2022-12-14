import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useContext, useState } from 'react';

import { getNewSelectedMembers, getTaskId } from 'store/editTask/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setNewSelectedMembers } from 'store/editTask/slice';
import { setTaskMemberAction } from 'store/editTask/thunk';
import { selectPopulatedUsers } from 'store/users/selectors';
import { IPopulatedUser } from 'store/users/types';
import { ROLES } from 'constants/types/common';
import MemberItem from 'components/Task/Members/MemberItem';
import { RightsRoleContext } from 'components/Task/context';
import styles from './index.module.scss';
import useSelectOptions from '../TaskHook/useSelectOptions';
import useMembersProps from '../MembersHook/useMembersProps';
import CustomSelect from '../CustomSelect';

const AddMemberButton: FC = () => {
  const roleName = useContext(RightsRoleContext).role;
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const options = useSelectOptions();
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);

  const usersData = useMembersProps(roleName);
  const roleId = usersData?.roleId;
  const watcherRoleId = useMembersProps(ROLES.watcher)?.roleId;

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string) => {
    dispatch(setNewSelectedMembers([value]));
  };

  const onBlur = () => {
    options.common.onBlur();
    setIsVisible(!isVisible);
    if (roleAssign && taskId && roleId) {
      dispatch(
        setTaskMemberAction({
          task_id: taskId,
          assign_user_id: roleAssign[0],
          task_role_id: roleId,
        }),
      );
      if (roleName !== ROLES.watcher && watcherRoleId) {
        dispatch(
          setTaskMemberAction({
            task_id: taskId,
            assign_user_id: roleAssign[0],
            task_role_id: watcherRoleId,
          }),
        );
      }
      dispatch(setNewSelectedMembers([]));
    }
  };

  return (
    <div className={styles.addmemberWrapper}>
      {isVisible ? (
        <CustomSelect
          {...options.common}
          list={allUsers}
          itemKey="key"
          itemLabel="name"
          itemValue="user_id"
          defaultValue={roleAssign}
          dropdownClassName={styles.dropdown}
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
        >
          {MemberItem}
        </CustomSelect>
      ) : (
        <Button className={styles.addmember} onClick={showMemberModal}>
          + ???????????????? ??????????????????
        </Button>
      )}
    </div>
  );
};

export default AddMemberButton;
