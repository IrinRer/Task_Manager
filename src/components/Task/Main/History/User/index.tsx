import UserAvatar from 'components/Common/UserAvatar';
import React from 'react';

import styles from '../index.module.scss';

const User = ({ item, text }) => {
  return (
    <div className={styles.historyElemUser}>
      <UserAvatar user={item.user} />
      <span className={styles.spanUser}>{`${item.user.name} ${text}`}</span>
    </div>
  );
};

export default User;
