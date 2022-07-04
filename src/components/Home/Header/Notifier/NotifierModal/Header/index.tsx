import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React from 'react';
import { getNewTotal } from 'store/notifications/selectors';
import { setAllNotificationsViewedAction } from 'store/notifications/thunk';
import styles from './index.module.scss';

const Header = () => {
  const newTotal = useAppSelector(getNewTotal);
  const dispatch = useAppDispatch();

  const handleReadAll = () => {
    if (newTotal > 0) {
      dispatch(setAllNotificationsViewedAction());
    }
  };

  return (
    // модульный стиль верхнего div съедается antd поэтому глобальный
    <div className="notify-header">
      <div className={styles.title}>
        <span>Уведомления</span>
        <span className={styles.count}>{newTotal}</span>
      </div>
      {newTotal > 0 ? (
        <div className={styles.readAll} onClick={handleReadAll}>
          Прочитать все
        </div>
      ) : (
        <div className={styles.noNew}>Прочитано</div>
      )}
    </div>
  );
};

export default Header;
