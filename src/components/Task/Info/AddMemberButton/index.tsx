import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  getMembers,
  getNewSelectedMembers,
  getTaskId,
  getTaskWatchersID,
  getUnselectedMembers,
  getWatcherRoleID,
} from 'store/task/selectors';
import {
  deleteTaskWatchersAction,
  setTaskWatchersAction,
} from 'store/task/thunk';
import { setNewSelectedMembers, setUnselectedMembers } from 'store/task/slice';
import { ITaskMembers } from 'store/task/types';
import styles from './index.module.scss';

type TProps = {
  multi: boolean;
};
const { Option } = Select;

const AddMemberButton: FC<TProps> = (props: TProps) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { multi } = props;
  const members: ITaskMembers[] = useAppSelector(getMembers);
  const taskId = useAppSelector(getTaskId);
  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);
  const roleAssign = useAppSelector(getNewSelectedMembers);
  const roleUnassign = useAppSelector(getUnselectedMembers);

  const showMemberModal = (e) => {
    setIsVisible(true);
  };

  const onChange = (value) => {
    dispatch(
      setNewSelectedMembers(
        value.filter((elem: string) => watchersID.indexOf(elem) === -1),
      ),
    );
    dispatch(
      setUnselectedMembers(
        watchersID.filter((elem: string) => value.indexOf(elem) === -1),
      ),
    );
  };

  const onSearch = (val) => {
    // console.log('search:', val);
  };

  const onBlur = () => {
    setIsVisible(!isVisible);
    roleAssign?.forEach((element) => {
      dispatch(
        setTaskWatchersAction({
          task_id: taskId,
          assign_user_id: element,
          task_role_id: watcherRoleID,
        }),
      );
    });
    roleUnassign?.forEach((element) => {
      dispatch(
        deleteTaskWatchersAction({
          task_id: taskId,
          assign_user_id: element,
          task_role_id: watcherRoleID,
        }),
      );
    });
  };

  const filterOption = (input, option) => {
    return option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const filterSort = (optionA, optionB) => {
    return optionA!.children
      .toLowerCase()
      .localeCompare(optionB!.children.toLowerCase());
  };

  const children = (
    <>
      {members.length !== 0
        ? members.map((el) => (
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
        <Select<string[] | number, { value: string; children: string }>
          mode={multi ? 'multiple' : undefined}
          className={styles.members}
          defaultValue={watchersID
            .concat(roleAssign || [])
            .filter((elem: string) =>
              roleUnassign ? roleUnassign.indexOf(elem) === -1 : true,
            )}
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
