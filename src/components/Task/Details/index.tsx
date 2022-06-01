import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskStatus, getTaskResponsible } from 'store/editTask/selectors';

import { ROLES } from 'constants/types/common';
import styles from './index.module.scss';
import OneMember from '../Members/OneMember';

const Info: React.FC = () => {
  const responsible = useAppSelector(getTaskResponsible);
  const status = useAppSelector(getTaskStatus);

  return (
    <>
      <div className={styles.infoLine}>
        <span>Статус</span> <span>{status}</span>
      </div>
      <div className={styles.infoLine}>
        <span>{ROLES.responsible}</span>
        {responsible ? (
          <OneMember editable={false} roleName={ROLES.responsible} />
        ) : null}
      </div>
    </>
  );
};

export default Info;
