import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getEditMembersLoading } from 'store/editTask/selectors';
import uniqueId from 'lodash/uniqueId';
import Spinner from 'components/Common/Spinner';
import { ROLES } from 'constants/types/common';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES, TRights } from 'constants/rights';
import {
  RightsRoleContext,
  useRightsRoleContextValue,
} from 'constants/taskContext';
import OneMember from './OneMember';
import MembersWrapperMulti from './MembersWrapperMulti';
import MembersByOne from './MembersByOne';

type TElementsMembers = {
  id: string;
  title: TRights;
  editable: boolean;
  block: JSX.Element;
};

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

  const elements: TElementsMembers[] = [
    {
      id: uniqueId(),
      title: ROLES.author,
      editable: false,
      block: (
        <RightsRoleContext.Provider
          value={useRightsRoleContextValue(ROLES.author, false)}
        >
          <OneMember />
        </RightsRoleContext.Provider>
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.responsible,
      editable: isRightsEditResponsible,
      block: (
        <RightsRoleContext.Provider
          value={useRightsRoleContextValue(
            ROLES.responsible,
            isRightsEditResponsible,
          )}
        >
          <OneMember />
        </RightsRoleContext.Provider>
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.implementer,
      editable: isRightsEditImplementer,
      block: (
        <RightsRoleContext.Provider
          value={useRightsRoleContextValue(
            ROLES.implementer,
            isRightsEditImplementer,
          )}
        >
          <MembersByOne multiAdd usersMaxCount={3} />
        </RightsRoleContext.Provider>
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.watcher,
      editable: isRightsEditWatchers,
      block: (
        <RightsRoleContext.Provider
          value={useRightsRoleContextValue(ROLES.watcher, isRightsEditWatchers)}
        >
          <MembersByOne multiAdd usersMaxCount={50} />
        </RightsRoleContext.Provider>
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
          <RightsRoleContext.Provider
            // eslint-disable-next-line react-hooks/rules-of-hooks
            value={useRightsRoleContextValue(el.title, el.editable)}
          >
            <MembersWrapperMulti key={el.id}>{el.block}</MembersWrapperMulti>
          </RightsRoleContext.Provider>
        );
      })}
    </>
  );
};

export default Info;
