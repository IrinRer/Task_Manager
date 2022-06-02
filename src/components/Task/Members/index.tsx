import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getEditMembersLoading } from 'store/editTask/selectors';
import uniqueId from 'lodash/uniqueId';
import Spinner from 'components/Common/Spinner';
import { ROLES } from 'constants/types/common';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import { EditableContext, RoleContext } from 'constants/common';
import OneMember from './OneMember';
import MembersWrapperMulti from './MembersWrapperMulti';
import MembersByOne from './MembersByOne';

const Info: React.FC = () => {
  const editLoading = useAppSelector(getEditMembersLoading);
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRightsEditWatchers = getRights(myMaxRole, RIGHTS_NAMES.editWatcher);
  const isRightsEditImplementer = getRights(
    myMaxRole,
    RIGHTS_NAMES.editImplementer,
  );
  const isRightsEditResponsible = getRights(
    myMaxRole,
    RIGHTS_NAMES.editResponsible,
  );

  const elements = [
    {
      id: uniqueId(),
      title: ROLES.author_short,
      editable: false,
      block: (
        <RoleContext.Provider value={ROLES.author}>
          <EditableContext.Provider value={false}>
            <OneMember />
          </EditableContext.Provider>
        </RoleContext.Provider>
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.responsible,
      editable: isRightsEditResponsible,
      block: (
        <RoleContext.Provider value={ROLES.responsible}>
          <EditableContext.Provider value={isRightsEditResponsible}>
            <OneMember />
          </EditableContext.Provider>
        </RoleContext.Provider>
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.implementer,
      editable: isRightsEditImplementer,
      block: (
        <RoleContext.Provider value={ROLES.implementer}>
          <EditableContext.Provider value={isRightsEditImplementer}>
            <MembersByOne multiAdd usersMaxCount={3} />
          </EditableContext.Provider>
        </RoleContext.Provider>
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.watcher,
      editable: isRightsEditWatchers,
      block: (
        <RoleContext.Provider value={ROLES.watcher}>
          <EditableContext.Provider value={isRightsEditWatchers}>
            <MembersByOne multiAdd usersMaxCount={50} />
          </EditableContext.Provider>
        </RoleContext.Provider>
      ),
    },
  ];

  if (editLoading) {
    return <Spinner margin="0 auto" size="default" />;
  }

  return (
    <>
      {elements.map((el) => {
        return (
          <RoleContext.Provider
            value={el.title === ROLES.author_short ? ROLES.author : el.title}
          >
            <EditableContext.Provider value={el.editable}>
              <MembersWrapperMulti key={el.id}>{el.block}</MembersWrapperMulti>
            </EditableContext.Provider>
          </RoleContext.Provider>
        );
      })}
    </>
  );
};

export default Info;
