import { PriorityName } from 'constants/types/common';
import React from 'react';
import styles from './index.module.scss';

interface IProps {
  priority: PriorityName | null;
}

const STYLES: string[] = ['low', 'middle', 'high'];

const Priority: React.FC<IProps> = ({ priority }) => {
  return (
    <div className={styles.wrapper}>
      {priority ? (
        <span className={styles[STYLES[PriorityName[priority]]]}> </span>
      ) : null}
      <span>{priority}</span>
    </div>
  );
};

export default Priority;
