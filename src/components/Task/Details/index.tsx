import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskResponsible,
  getTaskId,
  getEditStatusLoading,
} from 'store/editTask/selectors';
import Spinner from 'components/Common/Spinner';
import StatusWithPopover from 'components/Common/StatusWithPopover';

import { ROLES } from 'constants/types/common';
import styles from './index.module.scss';

const Info: React.FC = () => {
  const responsible = useAppSelector(getTaskResponsible);
  const taskId = useAppSelector(getTaskId);
  const editLoading = useAppSelector(getEditStatusLoading);

  return (
    <>
      <div className={styles.infoLine}>
        {/* <span>Статус</span> <span>{status}</span> */}
        <span>Статус</span>{' '}
        <span className={styles.second}>
          {' '}
          {/* <Preloader size="large" /> */}
          {editLoading ? (
            <div className={styles.spinner}>
              <Spinner size="large" />
            </div>
          ) : taskId ? (
            <StatusWithPopover taskId={taskId} edit />
          ) : (
            ''
          )}
        </span>
      </div>
      <div className={styles.infoLine}>
        <span>{ROLES.responsible}</span>
        {responsible && <span>{responsible.name}</span>}
      </div>
    </>
  );
};

export default Info;
