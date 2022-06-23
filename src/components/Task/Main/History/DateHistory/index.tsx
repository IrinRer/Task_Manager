import React from 'react';

import { locale,  DATE_FORMAT_HISTORY } from 'constants/common';
import { formatRelative } from 'date-fns';
import styles from '../index.module.scss';


const DateHistory = ({ item }) => {
  console.log(formatRelative(
    new Date('2022-06-21T20:30:36.568Z'),
    new Date(),
    { locale }))

    return (
      <span className={styles.date}>{`${formatRelative(
        new Date(item.created),
        new Date(),
        { locale },
      )}`}</span>
    );
  };

export default DateHistory;
