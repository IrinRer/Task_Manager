import classnames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

interface IProps {
  label: string;
  color?: string;
}

const PriorityCheckboxLabel: React.FC<IProps> = ({ color, label }) => {
  const colorDotClassName = classnames(
    styles.colorDot,
    styles[`colorDot${color}`],
  );

  return (
    <div className={styles.priorityCheckboxLabel}>
      <div className={colorDotClassName} />
      <p className={styles.labelText}>{label}</p>
    </div>
  );
};

export default PriorityCheckboxLabel;
