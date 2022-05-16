import React from 'react';
import { addCheckListAction } from 'store/editTask/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import styles from './index.module.scss';

const TaskActionsPopoverMenu = () => {
  const dispatch = useAppDispatch();

  const handleAddCheckList = () => {
    dispatch(addCheckListAction());
  };

  return (
    <div>
      <button
        type="button"
        className={styles.menuOption}
        onClick={handleAddCheckList}
      >
        Добавить&nbsp;чек-лист
      </button>
    </div>
  );
};

export default TaskActionsPopoverMenu;
