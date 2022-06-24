import React from 'react';
import { locale, DATE_FORMAT_HISTORY } from 'constants/history/common';
import { formatRelative } from 'date-fns';
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
