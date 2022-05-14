import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getEditMembersLoading,
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getTaskWatchers,
} from 'store/editTask/selectors';
import {
  getImplementerRoleID,
  getResponsibleRoleID,
} from 'store/common/roles/selectors';
import uniqueId from 'lodash/uniqueId';
import Spinner from 'components/Common/Spinner';
import MembersWrapper from './MembersWrapper';
import OneMember from './OneMember';
import Watchers from './Watchers';
import MembersWrapperMulti from './MembersWrapperMulti';

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);
  const watchers = useAppSelector(getTaskWatchers);

  const responsibleRoleID = useAppSelector(getResponsibleRoleID);
  const implementerRoleID = useAppSelector(getImplementerRoleID);

  const editLoading = useAppSelector(getEditMembersLoading);

  const isManyUsers = watchers.length > 3;

  const elements = [
    {
      id: uniqueId(),
      title: 'Автор',
      block: <OneMember user={author || null} roleId="" />,
      expand: false,
    },
    {
      id: uniqueId(),
      title: 'Ответственный',
      block: (
        <OneMember
          editable
          user={responsible || null}
          roleId={responsibleRoleID || ''}
        />
      ),
      expand: false,
    },
    {
      id: uniqueId(),
      title: 'Исполнитель',
      block: (
        <OneMember
          editable
          user={implementer || null}
          roleId={implementerRoleID || ''}
        />
      ),
      expand: false,
    },
    {
      id: uniqueId(),
      title: `Наблюдатель`,
      length: watchers.length,
      block: <Watchers />,
      expand: isManyUsers,
    },
  ];

  if (editLoading) {
    return <Spinner margin="0 auto" size="default" />;
  }

  return (
    <>
      {elements.map((el) => {
        if (el.expand) {
          return (
            <MembersWrapperMulti
              key={el.id}
              roleName={el.title}
              length={el.length || 0}
            >
              {el.block}
            </MembersWrapperMulti>
          );
        }
        return (
          <MembersWrapper key={el.id} roleName={el.title}>
            {el.block}
          </MembersWrapper>
        );
      })}
    </>
  );
};

export default Info;
