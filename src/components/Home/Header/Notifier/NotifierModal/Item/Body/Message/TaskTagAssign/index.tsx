import React from 'react';
import CustomTag from 'components/Common/CustomTag';
import { NotificationMessageToShow } from 'constants/notify';
import { TagColor } from 'constants/types/common';
import styles from './index.module.scss';

interface IProps {
  name: string;
  color: TagColor;
}

const TaskTagAssign: React.FC<IProps> = ({ name, color }) => {
  return (
    <>
      <div>{NotificationMessageToShow.taskTagAssign}</div>
      <div className={styles.tags}>
        <CustomTag title={name} color={color} closable={false} />
      </div>
    </>
  );
};

export default TaskTagAssign;
