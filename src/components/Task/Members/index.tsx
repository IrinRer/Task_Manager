import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getEditMembersLoading } from 'store/editTask/selectors';
import Spinner from 'components/Common/Spinner';
import { ROLES } from 'constants/types/common';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES, TRights } from 'constants/rights';
import OneMember from './OneMember';
import MembersWrapperMulti from './MembersWrapperMulti';
import MembersByOne from './MembersByOne';
import ContextWrapper from '../ContextWrapper';

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
      id: '1',
      title: ROLES.author,
      editable: false,
      block: <OneMember />,
    },
    {
      id: '2',
      title: ROLES.responsible,
      editable: isRightsEditResponsible,
      block: <OneMember />,
    },
    {
      id: '3',
      title: ROLES.implementer,
      editable: isRightsEditImplementer,
      block: <MembersByOne multiAdd usersMaxCount={3} />,
    },
    {
      id: '4',
      title: ROLES.watcher,
      editable: isRightsEditWatchers,
      block: <MembersByOne multiAdd usersMaxCount={50} />,
    },
  ];

  if (editLoading) {
    return <Spinner margin="0 auto" size="default" />;
  }

  return (
    <>
      {elements.map((el) => {
        return (
          <ContextWrapper key={el.id} role={el.title} isRights={el.editable}>
            <MembersWrapperMulti>{el.block}</MembersWrapperMulti>
          </ContextWrapper>
        );
      })}
    </>
  );
};

export default Info;
