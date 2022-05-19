import React from 'react';

import { Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsTaskEditable } from 'store/editTask/selectors';
import TaskActionsPopoverMenu from './TaskActionsPopoverMenu';
import styles from '../index.module.scss';

const TaskActions = () => {
  const isTaskEditable = useAppSelector(getIsTaskEditable);

  if (!isTaskEditable) {
    return null;
  }

  return (
    <div className={styles.taskActions}>
      <Popover
        trigger="click"
        content={TaskActionsPopoverMenu}
        overlayClassName={styles.popoverMenu}
        placement="bottomRight"
      >
        <PlusOutlined />
      </Popover>
    </div>
  );
};

export default TaskActions;
