import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import {
  getMembers,
  getNewSelectedMembers,
  getUnselectedMembers,
} from 'store/members/selectors';
import {
  deleteTaskMemberAction,
  setTaskMemberAction,
} from 'store/members/thunk';
import {
  setNewSelectedMembers,
  setUnselectedMembers,
} from 'store/members/slice';
import { getTaskId } from 'store/task/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import useSelectOptions from 'customHooks/Task/useSelectOptions';
import styles from '../AddMemberButton/index.module.scss';

type TProps = {
  selectedMembers: string[];
  roleId: string;
};

const { Option } = Select;

const AddMemberButtonMulti: FC<TProps> = (props: TProps) => {
  const { selectedMembers, roleId } = props;
  const options = useSelectOptions();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const members = useAppSelector(getMembers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);
  const roleUnassign = useAppSelector(getUnselectedMembers);

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value: string[]) => {
    if (selectedMembers) {
      dispatch(
        setNewSelectedMembers(
          value.filter((elem: string) => selectedMembers?.indexOf(elem) === -1),
        ),
      );
      dispatch(
        setUnselectedMembers(
          selectedMembers.filter((elem: string) => value.indexOf(elem) === -1),
        ),
      );
    }
  };

  const onSearch = (val) => {
    // console.log('search:', val);
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    if (Array.isArray(roleAssign) && Array.isArray(roleUnassign)) {
      roleAssign?.forEach((element) => {
        dispatch(
          setTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId || '',
          }),
        );
      });
      roleUnassign?.forEach((element) => {
        dispatch(
          deleteTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId || '',
          }),
        );
      });
    }
  };

  const generateValue = () => {
    if (selectedMembers) {
      return selectedMembers
        .concat(roleAssign || [])
        .filter((elem: string) =>
          roleUnassign ? roleUnassign.indexOf(elem) === -1 : true,
        );
    }
    return null;
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
          mode="multiple"
          dropdownClassName={styles.dropdown}
          defaultValue={generateValue()}
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

export default AddMemberButtonMulti;
