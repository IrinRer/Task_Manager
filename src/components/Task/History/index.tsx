import React from 'react';
import styles from './index.module.scss';

const History: React.FC = () => {
  return (
    <div className={styles.history}>
      <p>
        <span className={styles.historyElem}>
          Евгения Горелова создала задачу
        </span>
        <span className={styles.date}>12 янв 2020</span>
      </p>
      <p>
        <span className={styles.historyElem}>
          Евгения Горелова создала задачу
        </span>
        <span className={styles.date}>12 янв 2020</span>
      </p>
    </div>
  );
};

export default History;
