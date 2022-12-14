import { PriorityName } from 'constants/types/common';
import React from 'react';
import classnames from 'classnames';
import { STYLES } from 'constants/common';
import styles from './index.module.scss';

interface IProps {
  priority: string | undefined;
}

const Priority: React.FC<IProps> = ({ priority }) => {
  const classNames = classnames(
    priority ? styles[STYLES[PriorityName[priority]]] : '',
  );
  return priority ? (
    <div className={styles.wrapper}>
      <span className={classNames} />
      <span>{priority}</span>
    </div>
  ) : null;
};

export default Priority;
