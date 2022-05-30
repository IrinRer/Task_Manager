import React from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList } from 'store/editTask/selectors';
import classnames from 'classnames';
import Spinner from 'components/Common/Spinner';
import { addCheckList } from 'store/editTask/checkLists/addCheckList/thunk';
import { isAddCheckListLoading } from 'store/editTask/checkLists/addCheckList/selectors';
import styles from './index.module.scss';

const TaskActionsPopoverMenu = () => {
  const dispatch = useAppDispatch();

  const checkList = useAppSelector(getCheckList);
  const isCheckListLoading = useAppSelector(isAddCheckListLoading);
  const addCheckListButtonIsActive = !!checkList;

  const addCheckListButtonClassName = classnames(styles.menuOption, {
    [styles.menuOptionDisabled]: addCheckListButtonIsActive,
  });

  const handleAddCheckList = () => {
    dispatch(addCheckList());
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
