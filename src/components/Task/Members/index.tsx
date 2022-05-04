import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getTaskWatchers,
} from 'store/editTask/selectors';
import {
  getImplementerRoleID,
  getResponsibleRoleID,
} from 'store/common/roles/selectors';
import lodash, { uniqueId } from 'lodash';
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

  const elements = [
    {
      id: lodash(uniqueId()).toString(),
      title: 'Автор',
      block: <OneMember user={author || null} roleId="" />,
      expand: false,
    },
    {
      id: lodash(uniqueId()).toString(),
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
      id: lodash(uniqueId()).toString(),
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
      id: lodash(uniqueId()).toString(),
      title: `Наблюдатель ${watchers.length}`,
      block: <Watchers />,
      expand: true,
    },
  ];

  return (
    <>
      {elements.map((el) => {
        if (el.expand) {
          return (
            <MembersWrapperMulti key={el.id} roleName={el.title}>
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
