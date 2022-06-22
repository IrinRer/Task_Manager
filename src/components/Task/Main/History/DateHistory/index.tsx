import React from 'react';
import { formatRelative } from 'date-fns';
import { locale } from 'constants/common';

import styles from '../index.module.scss';

const DateHistory = ({ item }) => {
    return (
      <span className={styles.date}>{`${formatRelative(
        new Date(item.created),
        new Date(),
        { locale },
      )}`}</span>
    );
  };

export default DateHistory;
