import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useContext, useMemo } from 'react';

import { getUnselectedMembers, getTaskId } from 'store/editTask/selectors';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setUnselectedMembers } from 'store/editTask/slice';
import { deleteTaskMemberAction } from 'store/editTask/thunk';
import classnames from 'classnames';
import { ROLES } from 'constants/types/common';
import SimpleSelect from 'components/Common/SimpleSelect';
import { EditableContext, RoleContext } from 'constants/common';
import MemberItem from 'components/Task/Members/MemberItem';
import styles from '../AddMemberButton/index.module.scss';
import stylesList from './index.module.scss';
import useSelectOptions from '../TaskHook/useSelectOptions';
import useMembersProps from '../MembersHook/useMembersProps';

type TProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListMemberMulti: FC<TProps> = ({ isActive, setIsActive }) => {
  const roleName = useContext(RoleContext);
  const editable = useContext(EditableContext);
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

  const closeList = () => {
    options.common.onBlur();
    setIsActive(!isActive);
  };

  const onBlur = () => {
    closeList();
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

  const unselectedMembersWithNew = useMemo(() => {
    if (selectedMembers) {
      return selectedMembers.filter((elem: string) =>
        roleUnassign ? isUnassignUser(roleUnassign, elem) : true,
      );
    }
    return null;
  }, [roleUnassign, selectedMembers]);

  const users = useMemo(() => {
    return usersData?.users
      ? usersData?.users.filter((el) => {
          return !isUnassignUser(unselectedMembersWithNew || [], el.user_id);
        })
      : null;
  }, [unselectedMembersWithNew, usersData?.users]);

  return (
    <div
      className={classnames(
        styles.addmemberWrapper,
        stylesList.listMemberWrapper,
      )}
    >
      <SimpleSelect
        {...options.common}
        list={users}
        itemKey="user_id"
        OptionItem={MemberItem}
        itemValue="user_id"
        mode="multiple"
        menuItemSelectedIcon={editable ? <CloseOutlined /> : null}
        dropdownClassName={classnames(
          editable ? styles.dropdown : stylesList.dropdownList,
        )}
        defaultValue={unselectedMembersWithNew}
        suffixIcon={
          <span
            role="img"
            aria-label="search"
            className="anticon anticon-search"
          >
            <SearchOutlined />
          </span>
        }
        onChange={editable ? onChange : () => {}}
        onBlur={editable ? onBlur : closeList}
      />
    </div>
  );
};

export default ListMemberMulti;
