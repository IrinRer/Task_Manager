import React from 'react';
import { Popover } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import StatusChange from 'components/Common/StatusWithPopover/StatusChange';
import { RIGHTS_NAMES } from 'constants/rights';
import { useGetRights } from 'customHooks/useGetRights';
import { getTaskById } from 'store/tasks/selectors';
import { getTask } from 'store/editTask/selectors';
import { IResponseTask } from 'store/common/task/types';
import Status from './Status';
import styles from './index.module.scss';

interface IProps {
  taskId: string;
  edit?: boolean;
}

const StatusWithPopover: React.FC<IProps> = ({ taskId, edit = false }) => {
  let task: IResponseTask | undefined | null = useAppSelector((state) =>
    getTaskById(state, taskId),
  );
  const editTask = useAppSelector(getTask);
  if (edit) {
    task = editTask;
  }

  const isRights = useGetRights(RIGHTS_NAMES.editStatus, task);
  const trigger = task && isRights ? 'click' : '';

  return (
    <Popover
      overlayClassName="status-popover"
      content={<StatusChange taskId={taskId} />}
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
