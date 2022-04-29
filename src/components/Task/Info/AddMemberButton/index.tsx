import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import { getNewSelectedMembers, getTaskId } from 'store/task/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import useSelectOptions from 'customHooks/Task/useSelectOptions';
import { setNewSelectedMembers } from 'store/task/slice';
import { setTaskMemberAction } from 'store/task/thunk';
import { selectPopulatedUsers } from 'store/users/selectors';
import { IPopulatedUser } from 'store/users/types';
import styles from './index.module.scss';

type TProps = {
  roleId: string;
};

const { Option } = Select;

const AddMemberButton: FC<TProps> = ({ roleId }) => {
  const options = useSelectOptions();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string) => {
    dispatch(setNewSelectedMembers(value));
  };

  const onSearch = (val) => {
    // console.log('search:', val);
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    if (typeof roleAssign === 'string' && taskId) {
      dispatch(
        setTaskMemberAction({
          task_id: taskId,
          assign_user_id: roleAssign,
          task_role_id: roleId,
        }),
      );
      dispatch(setNewSelectedMembers([]));
    }
  };

  const children = (
    <>
      {allUsers?.map((el) => (
        <Option key={el.user_id + el.name} value={el.user_id}>
          {el.name}
        </Option>
      ))}
    </>
  );

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
          onSearch={onSearch}
        >
          {children}
        </Select>
      ) : null}
    </div>
  );
};

export default AddMemberButton;
