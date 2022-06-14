import { Popover } from 'antd';
import React, { useState } from 'react';
import classnames from 'classnames';
import Spinner from 'components/Common/Spinner';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { isDeleteCheckListItemLoading } from 'store/editTask/checkLists/deleteCheckListItem/selectors';
import { deleteCheckListItem } from 'store/editTask/checkLists/deleteCheckListItem/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { getIsTaskEditable } from 'store/editTask/selectors';
import styles from './index.module.scss';

interface IProps {
  check_list_item_id: string;
  isHover: boolean;
}

const ActionsMenu: React.FC<IProps> = ({ check_list_item_id, isHover }) => {
  const dispatch = useAppDispatch();

  const isCheckListItemLoading = useAppSelector(isDeleteCheckListItemLoading);
  const isTaskEditable = useAppSelector(getIsTaskEditable);

  const [popupMenuVisible, setPopupMenuVisible] = useState<boolean>(false);

  const handleDeleteCheckListItem = () => {
    dispatch(deleteCheckListItem(check_list_item_id));
  };

  const menuButtonClassName = classnames(styles.moreButton, {
    [styles.visible]: isHover || popupMenuVisible,
  });

  const handlePopoverVisibleChange = (visible: boolean) => {
    setPopupMenuVisible(visible);
  };

  return (
    <Popover
      trigger="click"
      afterVisibleChange={handlePopoverVisibleChange}
      content={
        isCheckListItemLoading ? (
          <Spinner />
        ) : (
          <button
            type="button"
            className={styles.menuOption}
            onClick={handleDeleteCheckListItem}
          >
            Удалить&nbsp;пункт
          </button>
        )
      }
      overlayClassName={styles.popoverMenu}
      placement="bottomRight"
    >
      {isTaskEditable && <MoreIcon className={menuButtonClassName} />}
    </Popover>
  );
};

export default ActionsMenu;
