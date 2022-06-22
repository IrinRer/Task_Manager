import React from 'react';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { DATE_FORMAT_UI, HISTORY_COMMAND } from 'constants/common';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import User from '../User';
import DateHistory from '../DateHistory';
import styles from '../index.module.scss';

const DateTask = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User item={item} text={HISTORY_COMMAND.changeDate} />
        <DateHistory item={item} />
      </div>

      <div className={styles.historyElemDate}>
        <Calendar />
        <span>Новый срок:</span>
        <span className={styles.spanDate}>
          {format(new Date(item.params.exec_stop), DATE_FORMAT_UI, {
            locale: ru,
          })}
        </span>
      </div>
    </div>
  );
};

export default DateTask;
