import React from 'react';
import { ReactComponent as CheckMarkIcon } from 'assets/icons/checkMark.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckLists } from 'store/common/task/selectors';
import CheckListItem from './CheckListItem';
import styles from './index.module.scss';

const Checklist: React.FC = () => {
  const checkList = useAppSelector(getCheckLists)[0];
  console.log(checkList);
  const { items } = checkList;
  console.log(items);
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
        {items &&
          items.map((checkListItem) => (
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
