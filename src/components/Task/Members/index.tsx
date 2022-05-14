import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getEditMembersLoading,
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
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

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);

  const responsibleRoleID = useAppSelector(getResponsibleRoleID);
  const implementerRoleID = useAppSelector(getImplementerRoleID);

  const editLoading = useAppSelector(getEditMembersLoading);

  const elements = [
    {
      id: uniqueId(),
      title: 'Автор',
      block: <OneMember user={author || null} roleId="" />,
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
    },
    {
      id: uniqueId(),
      title: 'Наблюдатель',
      block: <Watchers />,
    },
  ];

  if (editLoading) {
    return <Spinner margin="0 auto" size="default" />;
  }

  return (
    <>
      {elements.map((el) => {
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
