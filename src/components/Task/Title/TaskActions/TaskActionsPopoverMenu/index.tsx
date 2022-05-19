import React from 'react';
import { addCheckListAction } from 'store/editTask/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList, getIsCheckListLoading } from 'store/editTask/selectors';
import classnames from 'classnames';
import Spinner from 'components/Common/Spinner';
import styles from './index.module.scss';

const TaskActionsPopoverMenu = () => {
  const dispatch = useAppDispatch();

  const checkList = useAppSelector(getCheckList);
  const isCheckListLoading = useAppSelector(getIsCheckListLoading);
  const addCheckListButtonIsActive = !!checkList;

  const addCheckListButtonClassName = classnames(styles.menuOption, {
    [styles.menuOptionDisabled]: addCheckListButtonIsActive,
  });

  const handleAddCheckList = () => {
    dispatch(addCheckListAction());
  };

  return (
    <div>
      {isCheckListLoading ? (
        <Spinner />
      ) : (
        <button
          type="button"
          className={addCheckListButtonClassName}
          disabled={addCheckListButtonIsActive}
          onClick={handleAddCheckList}
        >
          Добавить&nbsp;чек-лист
        </button>
      )}
    </div>
  );
};

export default TaskActionsPopoverMenu;
