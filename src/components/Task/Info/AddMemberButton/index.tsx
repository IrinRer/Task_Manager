import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  getMembers,
  getNewSelectedMembers,
  getTaskId,
  getUnselectedMembers,
} from 'store/task/selectors';
import {
  deleteTaskWatchersAction,
  setTaskWatchersAction,
} from 'store/task/thunk';
import { setNewSelectedMembers, setUnselectedMembers } from 'store/task/slice';
import styles from './index.module.scss';

type TProps = {
  multi: boolean;
  selectedMembers?: string[];
  roleId: string;
};
const { Option } = Select;

const AddMemberButton: FC<TProps> = (props: TProps) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { multi, selectedMembers, roleId } = props;
  const members = useAppSelector(getMembers);
  const taskId = useAppSelector(getTaskId);

  const roleAssign = useAppSelector(getNewSelectedMembers);
  const roleUnassign = useAppSelector(getUnselectedMembers);

  const showMemberModal = () => {
    setIsVisible(true);
  };

  const onChange = (value) => {
    if (multi && selectedMembers) {
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
    if (!multi) {
      dispatch(setNewSelectedMembers(value));
    }
  };

  const onSearch = (val) => {
    // console.log('search:', val);
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    if (multi && Array.isArray(roleAssign) && Array.isArray(roleUnassign)) {
      roleAssign?.forEach((element) => {
        dispatch(
          setTaskWatchersAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId || '',
          }),
        );
      });
      roleUnassign?.forEach((element) => {
        dispatch(
          deleteTaskWatchersAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: roleId || '',
          }),
        );
      });
    }
    if (!multi && typeof roleAssign === 'string') {
      dispatch(
        setTaskWatchersAction({
          task_id: taskId,
          assign_user_id: roleAssign,
          task_role_id: roleId || '',
        }),
      );
    }
  };

  const filterOption = (input, option) => {
    return option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const filterSort = (optionA, optionB) => {
    return optionA!.children
      .toLowerCase()
      .localeCompare(optionB!.children.toLowerCase());
  };

  const generateValue = () => {
    if (multi && selectedMembers) {
      return selectedMembers
        .concat(roleAssign || [])
        .filter((elem: string) =>
          roleUnassign ? roleUnassign.indexOf(elem) === -1 : true,
        );
    }
    if (!multi && typeof roleAssign === 'string') {
      return roleAssign;
    }
    return null;
  };

  const children = (
    <>
      {members?.length !== 0
        ? members?.map((el) => (
            <Option key={el.user_id} value={el.user_id}>
              {el.name}
            </Option>
          ))
        : ''}
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
          mode={multi ? 'multiple' : undefined}
          className={styles.members}
          defaultValue={generateValue()}
          maxTagCount={1}
          listHeight={118}
          showSearch
          autoFocus
          open
          placeholder="Искать участников"
          optionFilterProp="children"
          defaultOpen
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
          filterOption={filterOption}
          filterSort={filterSort}
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
