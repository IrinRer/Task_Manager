import React, { useContext } from 'react';
import { HistoryContext } from '../context';

import styles from '../index.module.scss';

const User = () => {
  const data = useContext(HistoryContext);

  return (
    <div >
      {data.item ? (
          <span className={styles.spanUser}>
            <b>{data.item.user.name}</b> {data.text}
          </span>
      ) : null}
    </div>
  );
};

export default User;
