import React from 'react';

import { Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskActionsPopoverMenu from './TaskActionsPopoverMenu';
import styles from '../index.module.scss';

const TaskActions = () => {
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
