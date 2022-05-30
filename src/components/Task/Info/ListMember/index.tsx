import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC } from 'react';

import { getUnselectedMembers, getTaskId } from 'store/editTask/selectors';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setUnselectedMembers } from 'store/editTask/slice';
import { deleteTaskMemberAction } from 'store/editTask/thunk';
import classnames from 'classnames';
import { ROLES } from 'constants/types/common';
import SimpleSelect from 'components/Common/SimpleSelect';
import styles from '../AddMemberButton/index.module.scss';
import stylesList from './index.module.scss';
import useSelectOptions from '../TaskHook/useSelectOptions';
import useMembersProps from '../MembersHook/useMembersProps';

type TProps = {
  roleName: string;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListMemberMulti: FC<TProps> = ({ roleName, isActive, setIsActive }) => {
  const options = useSelectOptions();

  const roleUnassign = useAppSelector(getUnselectedMembers);
  const usersData = useMembersProps(roleName);
  const selectedMembers = usersData?.usersID;
  const watcherRoleId = useMembersProps(ROLES.watcher)?.roleId;

  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);

  const isUnassignUser = (users: Array<string> | string, elem: string) => {
    return users?.indexOf(elem) === -1;
  };

  const onChange = (value: Array<string>) => {
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
        if (roleName !== ROLES.watcher && watcherRoleId) {
          dispatch(
            deleteTaskMemberAction({
              task_id: taskId,
              assign_user_id: element,
              task_role_id: watcherRoleId,
            }),
          );
        }
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

  const unselectedMembersWithNew = generateValue();

  const users = usersData?.users
    ? usersData?.users.filter((el) => {
        return !isUnassignUser(unselectedMembersWithNew || [], el.user_id);
      })
    : null;

  return (
    <div
      className={classnames(
        styles.addmemberWrapper,
        stylesList.listMemberWrapper,
      )}
    >
      <SimpleSelect
        list={users}
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
