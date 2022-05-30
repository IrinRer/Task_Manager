import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskResponsible,
  getTaskId,
  getEditStatusLoading,
} from 'store/editTask/selectors';
import StatusWithPopover from 'components/Common/StatusWithPopover/StatusWithPopover';
import Spinner from 'components/Common/Spinner';
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
        <span>Ответственный</span>
        <span>{responsible ? responsible.name : null}</span>
      </div>
    </>
  );
};

export default Info;
