import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, Ref, RefObject, useRef } from 'react';

import {
  getUnselectedMembers,
  getTaskId,
  getTaskWatchersID,
  getTaskWatchers,
} from 'store/editTask/selectors';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setUnselectedMembers } from 'store/editTask/slice';
import { deleteTaskMemberAction } from 'store/editTask/thunk';
import { IUser } from 'store/users/types';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import classnames from 'classnames';
import { RefSelectProps } from 'antd/lib/select';
import styles from '../AddMemberButton/index.module.scss';
import stylesList from './index.module.scss';
import SimpleSelect from '../../../Common/SimpleSelect';
import useSelectOptions from '../TaskHook/useSelectOptions';

type TRoleData = {
  name: string;
  roleId: string;
  users: IUser[];
  usersID: string[];
};

type TProps = {
  roleName: string;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListMemberMulti: FC<TProps> = ({ roleName, isActive, setIsActive }) => {
  const options = useSelectOptions();
  const watchers = useAppSelector(getTaskWatchers);
  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);

  const RoleData: Array<TRoleData> = [
    {
      name: 'Наблюдатель',
      roleId: watcherRoleID || '',
      users: watchers,
      usersID: watchersID,
    },
  ];

  const usersData = RoleData.find((el) => {
    return el.name === roleName;
  });

  const roleUnassign = useAppSelector(getUnselectedMembers);
  const selectedMembers = usersData?.usersID;

  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);

  const isUnassignUser = (users: string[] | string, elem: string) => {
    return users?.indexOf(elem) === -1;
  };

  const onChange = (value: string[]) => {
    if (selectedMembers) {
      dispatch(
        setUnselectedMembers(
          selectedMembers.filter((elem: string) => isUnassignUser(value, elem)),
        ),
      );
    }
  };

  const onBlur = () => {
    options.common.onBlur();
    setIsActive(!isActive);

    if (Array.isArray(roleUnassign) && taskId && usersData?.roleId) {
      roleUnassign?.forEach((element) => {
        dispatch(
          deleteTaskMemberAction({
            task_id: taskId,
            assign_user_id: element,
            task_role_id: usersData?.roleId,
          }),
        );
      });
      dispatch(setUnselectedMembers([]));
    }
  };

  const generateValue = () => {
    if (selectedMembers) {
      return selectedMembers.filter((elem: string) =>
        roleUnassign ? isUnassignUser(roleUnassign, elem) : true,
      );
    }
    return null;
  };

  return (
    <div
      className={classnames(
        styles.addmemberWrapper,
        stylesList.listMemberWrapper,
      )}
    >
      <SimpleSelect
        list={usersData?.users || null}
        itemKey="user_id"
        itemLabel="name"
        itemValue="user_id"
        {...options.common}
        mode="multiple"
        menuItemSelectedIcon={<CloseOutlined />}
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
      />
    </div>
  );
};

export default ListMemberMulti;
