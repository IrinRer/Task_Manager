import React from 'react';
import { ReactComponent as CheckMarkIcon } from 'assets/icons/checkMark.svg';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getCheckList,
  getCheckListProgress,
  getIsTaskEditable,
} from 'store/editTask/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteCheckListAction } from 'store/editTask/thunk';
import { Popconfirm } from 'antd';
import CheckListItem from './CheckListItem';
import styles from './index.module.scss';
import Index from './CheckListAddNewItem';
import CheckListTitle from './CheckListTitle';

const Checklist: React.FC = () => {
  const dispatch = useAppDispatch();

  const checkList = useAppSelector(getCheckList);
  const checkListProgress = useAppSelector(getCheckListProgress);
  const isTaskEditable = useAppSelector(getIsTaskEditable);

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
        <CheckListTitle />
        {isTaskEditable && (
          <Popconfirm
            title="Вы уверены?"
            cancelText="Отменить"
            okText="Удалить чек-лист"
            placement="bottomRight"
            onConfirm={handleDeleteCheckListClick}
            overlayClassName={styles.confirmationPopup}
          >
            <RecycleBinIcon className={styles.headerIconButton} />
          </Popconfirm>
        )}
      </div>
      <div className={styles.headerSection}>
        <p className={styles.progressPercentage}>{`${
          checkListProgress?.percent || 0
        }%`}</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${checkListProgress?.percent || 0}%` }}
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
      {isTaskEditable && <Index />}
    </div>
  );
};

export default Checklist;
