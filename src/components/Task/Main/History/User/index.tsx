import UserAvatar from 'components/Common/UserAvatar';
import React, { useContext } from 'react';
import { HistoryContext } from '../context';

import styles from '../index.module.scss';

const User = () => {
  const data = useContext(HistoryContext);

  return (
    <div className={styles.historyElemUser}>
      {data.item ? (
        <>
          <UserAvatar user={data.item.user} />
          <span
            className={styles.spanUser}
          >{`${data.item.user.name} ${data.text}`}</span>
        </>
      ) : null}
    </div>
  );
};

export default User;
