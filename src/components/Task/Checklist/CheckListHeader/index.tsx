import { Popconfirm } from 'antd';
import React from 'react';
import { ReactComponent as CheckMarkIcon } from 'assets/icons/checkMark.svg';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList, getIsTaskEditable } from 'store/editTask/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteCheckListAction } from 'store/editTask/thunks/checkLists/deleteCheckListAction';
import CheckListTitle from '../CheckListTitle';
import styles from './index.module.scss';

const CheckListHeader: React.FC = () => {
  const checkList = useAppSelector(getCheckList);

  const dispatch = useAppDispatch();

  const isTaskEditable = useAppSelector(getIsTaskEditable);

  const handleDeleteCheckListClick = () => {
    dispatch(deleteCheckListAction(checkList!.check_list_id));
  };

  return (
    <div className={styles.headerSection}>
      <CheckMarkIcon className={styles.headerIcon} />
      <CheckListTitle />
      {isTaskEditable && (
        <Popconfirm
          title="Вы уверены?"
          okText="Удалить чек-лист"
          cancelText="Отменить"
          placement="bottomRight"
          onConfirm={handleDeleteCheckListClick}
          icon={null}
          overlayClassName={styles.confirmationPopup}
          okButtonProps={{
            icon: <RecycleBinIcon className={styles.buttonIcon} />,
          }}
        >
          <RecycleBinIcon className={styles.headerIconButton} />
        </Popconfirm>
      )}
    </div>
  );
};

export default CheckListHeader;
