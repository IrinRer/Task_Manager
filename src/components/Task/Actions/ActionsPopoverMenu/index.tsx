import React from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList } from 'store/editTask/selectors';
import classnames from 'classnames';
import Spinner from 'components/Common/Spinner';
import { addCheckList } from 'store/editTask/checkLists/addCheckList/thunk';
import { isAddCheckListLoading } from 'store/editTask/checkLists/addCheckList/selectors';
import { setClickedAttachments } from 'store/editTask/attachments/slice';
import {
  getfileName,
  isClickedAttachments,
} from 'store/editTask/attachments/selectors';
import styles from './index.module.scss';

const ActionsPopoverMenu = () => {
  const dispatch = useAppDispatch();
  const checkList = useAppSelector(getCheckList);
  const isCheckListLoading = useAppSelector(isAddCheckListLoading);
  const addCheckListButtonIsActive = !!checkList;

  const isClickedAttachmentsBtn = useAppSelector(isClickedAttachments);
  const attachments = useAppSelector(getfileName);
  const addAttachmentsButtonIsActive =
    isClickedAttachmentsBtn || !!attachments.length;

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
          <button
            type="button"
            className={addCheckListButtonClassName}
            disabled={addCheckListButtonIsActive}
            onClick={handleAddCheckList}
          >
            Добавить&nbsp;чек-лист
          </button>
          <button
            type="button"
            className={addCheckListButtonClassName}
            disabled={addAttachmentsButtonIsActive}
            onClick={handleAttachments}
          >
            Добавить вложения
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsPopoverMenu;
