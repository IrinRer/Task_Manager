import React from 'react';
import { Popover } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskStatus,
  getTaskResponsible,
  getTaskId,
  getEditStatusLoading,
} from 'store/editTask/selectors';
import Status from 'components/Home/Block/Status';
import StatusChange from 'components/Common/StatusChange';
import Spinner from 'components/Common/Spinner';
import styles from './index.module.scss';

const Info: React.FC = () => {
  const responsible = useAppSelector(getTaskResponsible);
  const status = useAppSelector(getTaskStatus);
  const task_id = useAppSelector(getTaskId);
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
          ) : task_id ? (
            <Popover
              overlayClassName="popover"
              content={<StatusChange task_id={task_id} edit />}
              trigger="click"
            >
              <div>{status ? <Status statusName={status} /> : ''}</div>
            </Popover>
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
