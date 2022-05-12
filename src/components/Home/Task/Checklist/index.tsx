import React from 'react';
import { ReactComponent as CheckMarkIcon } from 'assets/icons/checkMark.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';

import styles from './index.module.scss';
import CheckListItem from './CheckListItem';

const checkListItems = [
  {
    check_list_item_id: '8bf4824c-7163-4095-8bb2-b3b48de9463d',
    message: 'hello',
    complete: false,
    created: '2022-05-06T22:32:38.406Z',
    updated: '2022-05-06T22:32:38.406Z',
  },
  {
    check_list_item_id: 'eb3d5b18-c239-48ed-b810-6253308e06e5',
    message: 'средней длины такой пункт',
    complete: true,
    created: '2022-05-06T22:38:41.094Z',
    updated: '2022-05-06T22:38:41.094Z',
  },
];

export interface ICheckListItem {
  check_list_item_id: string;
  message: string;
  complete: boolean;
  created: string;
  updated: string;
}

const Checklist: React.FC = () => {
  const percentage: number = 10;

  return (
    <div className={styles.checklist}>
      <div className={styles.headerSection}>
        <CheckMarkIcon className={styles.headerIcon} />
        <h4 className={styles.title}>Чек-лист</h4>
        <RecycleBinIcon className={styles.headerIconButton} />
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
      <div className={styles.checklistItems}>
        {checkListItems.map((checkListItem) => (
          <CheckListItem
            key={checkListItem.check_list_item_id}
            checkListItem={checkListItem}
          />
        ))}
      </div>
      <button type="button" className={styles.newItemButton}>
        <PlusIcon className={styles.newItemButtonIcon} />
        <p className={styles.newItemButtonText}>Добавить новый пункт</p>
      </button>
    </div>
  );
};

export default Checklist;
