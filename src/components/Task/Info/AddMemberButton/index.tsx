import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import { getMembers, getNewSelectedMembers } from 'store/members/selectors';
import { setTaskMemberAction } from 'store/members/thunk';
import { setNewSelectedMembers } from 'store/members/slice';
import { getTaskId } from 'store/task/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import useSelectOptions from 'customHooks/Task/useSelectOptions';
import styles from './index.module.scss';

type TProps = {
  roleId: string;
};

const { Option } = Select;

const AddMemberButton: FC<TProps> = ({ roleId }) => {
  const options = useSelectOptions();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const members = useAppSelector(getMembers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string[]) => {
    dispatch(setNewSelectedMembers(value));
  };

  const onSearch = (val) => {
    // console.log('search:', val);
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    if (typeof roleAssign === 'string') {
      dispatch(
        setTaskMemberAction({
          task_id: taskId,
          assign_user_id: roleAssign,
          task_role_id: roleId || '',
        }),
      );
    }
  };

  const children = (
    <>
      {members?.map((el) => (
        <Option value={el.user_id}>{el.name}</Option>
      ))}
    </>
  );

  return (
    <div className={styles.addmemberWrapper}>
      {!isVisible ? (
        <Button className={styles.addmember} onClick={showMemberModal}>
          + добавить участника
        </Button>
      ) : (
        ''
      )}

      {isVisible ? (
        <Select<string[] | number | string, { value: string; children: string }>
          defaultValue={roleAssign}
          dropdownClassName={styles.dropdown}
          {...options}
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
      ) : (
        ''
      )}
    </div>
  );
};

export default AddMemberButton;
