import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getEditMembersLoading } from 'store/editTask/selectors';
import uniqueId from 'lodash/uniqueId';
import Spinner from 'components/Common/Spinner';
import { ROLES } from 'constants/types/common';
import OneMember from './OneMember';
import MembersWrapperMulti from './MembersWrapperMulti';
import MembersByOne from './MembersByOne';

const Info: React.FC = () => {
  const editLoading = useAppSelector(getEditMembersLoading);

  const elements = [
    {
      id: uniqueId(),
      title: 'Автор',
      block: <OneMember roleName="Автор" />,
    },
    {
      id: uniqueId(),
      title: ROLES.responsible,
      block: <OneMember editable roleName={ROLES.responsible} />,
    },
    {
      id: uniqueId(),
      title: ROLES.implementer,
      block: (
        <MembersByOne roleName={ROLES.implementer} multiAdd usersMaxCount={3} />
      ),
    },
    {
      id: uniqueId(),
      title: ROLES.watcher,
      block: (
        <MembersByOne roleName={ROLES.watcher} multiAdd usersMaxCount={50} />
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
          <MembersWrapperMulti key={el.id} roleName={el.title}>
            {el.block}
          </MembersWrapperMulti>
        );
      })}
    </>
  );
};

export default Info;
