import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getEditMembersLoading } from 'store/editTask/selectors';
import uniqueId from 'lodash/uniqueId';
import Spinner from 'components/Common/Spinner';
import { ROLES } from 'constants/types/common';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
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
      title: 'Автор',
      editable: false,
      block: <OneMember editable={false} roleName={ROLES.author} />,
    },
    {
      id: uniqueId(),
      title: ROLES.responsible,
      editable: isRightsEditResponsible,
      block: (
        <OneMember
          editable={isRightsEditResponsible}
          roleName={ROLES.responsible}
        />
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.implementer,
      editable: isRightsEditImplementer,
      block: (
        <MembersByOne
          editable={isRightsEditImplementer}
          roleName={ROLES.implementer}
          multiAdd
          usersMaxCount={3}
        />
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.watcher,
      editable: isRightsEditWatchers,
      block: (
        <MembersByOne
          editable={isRightsEditWatchers}
          roleName={ROLES.watcher}
          multiAdd
          usersMaxCount={50}
        />
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
          <MembersWrapperMulti
            key={el.id}
            roleName={el.title}
            editable={el.editable}
          >
            {el.block}
          </MembersWrapperMulti>
        );
      })}
    </>
  );
};

export default Info;
