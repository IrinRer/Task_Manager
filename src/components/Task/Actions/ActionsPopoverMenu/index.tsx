import React from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList } from 'store/editTask/selectors';
import classnames from 'classnames';
import Spinner from 'components/Common/Spinner';
import { addCheckList } from 'store/editTask/checkLists/addCheckList/thunk';
import { isAddCheckListLoading } from 'store/editTask/checkLists/addCheckList/selectors';
import { setClickedAttachments } from 'store/editTask/attachments/slice';
import {
  getFileName,
  isClickedAttachments,
} from 'store/editTask/attachments/selectors';
import styles from './index.module.scss';

const ActionsPopoverMenu = () => {
  const dispatch = useAppDispatch();
  const checkList = useAppSelector(getCheckList);
  const isCheckListLoading = useAppSelector(isAddCheckListLoading);
  const addCheckListButtonIsActive = Boolean(checkList);

  const isClickedAttachmentsBtn = useAppSelector(isClickedAttachments);
  const attachments = useAppSelector(getFileName);
  const addAttachmentsButtonIsActive =
    isClickedAttachmentsBtn || Boolean(attachments.length);

  const addCheckListButtonClassName = classnames(styles.menuOption, {
    [styles.menuOptionDisabled]: addCheckListButtonIsActive,
  });

  const handleAddCheckList = () => {
    dispatch(addCheckList());
  };

  const handleAttachments = () => {
    dispatch(setClickedAttachments(true));
  };

  return (
    <div>
      {isCheckListLoading ? (
        <Spinner />
      ) : (
        <div className={styles.action}>
          <Button
            type="text"
            className={addCheckListButtonClassName}
            disabled={addCheckListButtonIsActive}
            onClick={handleAddCheckList}
          >
            Добавить чек-лист
          </Button>

          <Button
            type="text"
            className={addCheckListButtonClassName}
            disabled={addAttachmentsButtonIsActive}
            onClick={handleAttachments}
          >
            Добавить вложения
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionsPopoverMenu;
