import React from 'react';
import { ReactComponent as CheckMarkIcon } from 'assets/icons/checkMark.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import styles from './index.module.scss';

const Checklist = () => {
  const percentage: number = 10;

  return (
    <div className={styles.checklist}>
      <div className={styles.headerSection}>
        <CheckMarkIcon className={styles.headerIcon} />
        <h4 className={styles.title}>Чек-лист</h4>
      </div>
      <div className={styles.headerSection}>
        <p className={styles.progressPercentage}>{`${percentage}%`}</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <button type="button" className={styles.newItemButton}>
        <PlusIcon className={styles.newItemButtonIcon} />
        <p className={styles.newItemButtonText}>Добавить новый пункт</p>
      </button>
    </div>
  );
};

export default Checklist;
