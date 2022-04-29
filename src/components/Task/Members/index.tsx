import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
} from 'store/task/selectors';
import {
  getImplementerRoleID,
  getResponsibleRoleID,
} from 'store/common/roles/selectors';
import MembersWrapper from './MembersWrapper';
import OneMember from './OneMember';
import Watchers from './Watchers';

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);

  const responsibleRoleID = useAppSelector(getResponsibleRoleID);
  const implementerRoleID = useAppSelector(getImplementerRoleID);

  const elements = [
    { title: 'Автор', block: <OneMember user={author || null} roleId="" /> },
    {
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
      title: 'Наблюдатель',
      block: <Watchers />,
    },
  ];

  return (
    <>
      {elements.map((el) => {
        return (
          <MembersWrapper key={el.title} roleName={el.title}>
            {el.block}
          </MembersWrapper>
        );
      })}
    </>
  );
};

export default Info;
