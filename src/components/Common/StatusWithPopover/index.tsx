import { Popover } from 'antd';
import StatusChange from 'components/Common/StatusWithPopover/StatusChange';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getTaskById } from 'store/tasks/selectors';
import { getTask } from 'store/editTask/selectors';
import { TTask } from 'constants/types/common';
import { IResponseTask } from 'store/common/task/types';
import Status from './Status';
import styles from './index.module.scss';

interface IProps {
  taskId: string;
  edit?: boolean;
}

const StatusWithPopover: React.FC<IProps> = ({ taskId, edit = false }) => {
  let task: TTask | IResponseTask | undefined | null = useSelector(
    (state: RootState) => getTaskById(state, taskId),
  );
  const editTask = useSelector(getTask);
  if (edit) {
    task = editTask;
  }

  const trigger = task /* && canUserChangeTaskStatus(userId, task) */
    ? 'click'
    : '';

  return (
    <Popover
      overlayClassName="status-popover"
      content={<StatusChange taskId={taskId} edit={edit} />}
      trigger={trigger}
    >
      <div className={styles.status}>
        {task?.status.name ? (
          <Status
            statusName={task?.status.name || ''}
            disabled={trigger !== 'click'}
          />
        ) : null}
      </div>
    </Popover>
  );
};

export default StatusWithPopover;
