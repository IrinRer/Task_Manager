import React from 'react';
import { Popover } from 'antd';
import StatusChange from 'components/Common/StatusWithPopover/StatusChange';
import { RIGHTS_NAMES } from 'constants/rights';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useGetRights } from 'customHooks/useGetRights';
import { getTaskById } from 'store/tasks/selectors';
import Status from './Status';

interface IProps {
  taskId: string;
  edit?: boolean;
}

const StatusWithPopover: React.FC<IProps> = ({ taskId, edit = false }) => {
  const task = useAppSelector((state) => getTaskById(state, taskId));
  const isRights = useGetRights(RIGHTS_NAMES.editStatus, task);
  const trigger = task && isRights ? 'click' : '';

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
