import React from 'react';
import { ReactComponent as CheckMarkIcon } from 'assets/icons/checkMark.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList, getCheckListProgress } from 'store/editTask/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteCheckListAction } from 'store/editTask/thunk';
import CheckListItem from './CheckListItem';
import styles from './index.module.scss';

const Checklist: React.FC = () => {
  const dispatch = useAppDispatch();

  const checkList = useAppSelector(getCheckList);
  const checkListProgress = useAppSelector(getCheckListProgress);

  const handleDeleteCheckListClick = () => {
    dispatch(deleteCheckListAction(checkList!.check_list_id));
  };

  if (!checkList) {
    return null;
  }

  return (
    <div className={styles.checklist}>
      <div className={styles.headerSection}>
        <CheckMarkIcon className={styles.headerIcon} />
        <h4 className={styles.title}>{checkList.title}</h4>
        <button
          type="button"
          onClick={handleDeleteCheckListClick}
          className={styles.headerIconButton}
        >
          <RecycleBinIcon />
        </button>
      </div>
      <div className={styles.headerSection}>
        <p className={styles.progressPercentage}>{`${checkListProgress}%`}</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${checkListProgress}%` }}
          />
        </div>
      </div>
      <div className={styles.checklistItems}>
        {checkList.items &&
          checkList.items.map((checkListItem) => (
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
