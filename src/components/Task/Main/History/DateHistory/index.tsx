import React, { useContext } from 'react';
import { locale } from 'constants/history/common';
import { formatRelative } from 'date-fns';
import styles from '../index.module.scss';
import { HistoryContext } from '../context';

const DateHistory = () => {
  const data = useContext(HistoryContext);
  return (
    <span className={styles.date}>{`${formatRelative(
      new Date(data.item?.created || ''),
      new Date(),
      { locale },
    )}`}</span>
  );
};

export default DateHistory;
