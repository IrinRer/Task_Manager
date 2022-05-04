import React from 'react';

import styles from './index.module.scss';

const PriorityCheckboxLabel = ({ color, label }) => {
  return (
    <div className={styles.priorityCheckboxLabel}>
      <div
        className={styles.colorDot}
        style={{ backgroundColor: `${color}` }}
      />
      <p className={styles.labelText}>{label}</p>
    </div>
  );
};

export default PriorityCheckboxLabel;
