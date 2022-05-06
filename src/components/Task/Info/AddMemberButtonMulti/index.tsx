import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
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
import { selectPopulatedUsers } from 'store/users/selectors';
import { IPopulatedUser } from 'store/users/types';
import debounce from 'lodash/debounce';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
import { fetchUsersAction } from 'store/users/thunk';
import styles from '../AddMemberButton/index.module.scss';
import UsersOption from '../UsersOption';

type TProps = {
  roleId: string;
};

const AddMemberButtonMulti: FC<TProps> = (props: TProps) => {
  const { roleId } = props;
  const options = useSelectOptions();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);
  const roleUnassign = useAppSelector(getUnselectedMembers);
  const selectedMembers = useAppSelector(getTaskWatchersID);

  const isNewUser = (users: string[] | string, elem: string) => {
    return users?.indexOf(elem) === -1;
  };

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string[]) => {
    if (selectedMembers) {
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

  const onSearch = (query: string) => {
    dispatch(fetchUsersAction(query));
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    if (Array.isArray(roleAssign) && Array.isArray(roleUnassign) && taskId) {
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
    if (selectedMembers) {
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
        <Select<string[] | number | string, { value: string; children: string }>
          {...options}
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
          onSearch={debounce(onSearch, DEBOUNCE_TIMEOUT)}
        >
          <UsersOption users={allUsers} />
        </Select>
      ) : null}
    </div>
  );
};

export default AddMemberButtonMulti;
