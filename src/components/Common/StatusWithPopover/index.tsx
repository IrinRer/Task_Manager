import { Popover } from 'antd';
import StatusChange from 'components/Common/StatusWithPopover/StatusChange';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { canUserChangeTaskStatus } from 'helpers/userRoles';
import React from 'react';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { getTaskById } from 'store/tasks/selectors';
import Status from './Status';

interface IProps {
  taskId: string;
  edit?: boolean;
}

const StatusWithPopover: React.FC<IProps> = ({ taskId, edit = false }) => {
  const userId = useAppSelector(getVerifyIdUser);
  const task = useAppSelector((state) => getTaskById(state, taskId));

  const trigger = task && canUserChangeTaskStatus(userId, task) ? 'click' : '';

  return (
    <Popover
      overlayClassName="popover"
      content={<StatusChange taskId={taskId} edit={edit} />}
      trigger={trigger}
    >
      <div>
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
