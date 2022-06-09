import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React from 'react';
import { getNewTotal } from 'store/notifications/selectors';
import styles from './index.module.scss';

const Header = () => {
  const newTotal = useAppSelector(getNewTotal);
  return (
    <div className={styles.notifyHeader}>
      <div className={styles.title}>
        <span>Уведомления</span>
        <span className={styles.count}>{newTotal}</span>
      </div>
      <div className={styles.readAll}>Прочитать все</div>
    </div>
  );
};

export default Header;
