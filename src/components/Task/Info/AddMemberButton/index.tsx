import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import { getNewSelectedMembers, getTaskId } from 'store/editTask/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setNewSelectedMembers } from 'store/editTask/slice';
import { setTaskMemberAction } from 'store/editTask/thunk';
import { selectPopulatedUsers } from 'store/users/selectors';
import { IPopulatedUser } from 'store/users/types';
import { fetchUsersAction } from 'store/users/thunk';
import debounce from 'lodash/debounce';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
import styles from './index.module.scss';
import SimpleSelect from '../SimpleSelect';
import useSelectOptions from '../TaskHook/useSelectOptions';

type TProps = {
  roleId: string;
};

const AddMemberButton: FC<TProps> = ({ roleId }) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const options = useSelectOptions();
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const taskId = useAppSelector(getTaskId);

  // const roleAssign = useAppSelector(getOneNewSelectedMembers);
  const roleAssign = useAppSelector(getNewSelectedMembers);

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string) => {
    dispatch(setNewSelectedMembers([value]));
  };

  const onSearch = (query: string) => {
    dispatch(fetchUsersAction(query));
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    if (roleAssign && taskId) {
      dispatch(
        setTaskMemberAction({
          task_id: taskId,
          assign_user_id: roleAssign[0],
          task_role_id: roleId,
        }),
      );
      dispatch(setNewSelectedMembers([]));
    }
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
          {...options}
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
          onSearch={debounce(onSearch, DEBOUNCE_TIMEOUT)}
        />
      ) : null}
    </div>
  );
};

export default AddMemberButton;
