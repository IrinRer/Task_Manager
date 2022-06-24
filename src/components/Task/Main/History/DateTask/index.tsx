import React from 'react';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { HISTORY_COMMAND } from 'constants/history/common';
import { DATE_FORMAT_UI } from 'constants/common';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import User from '../User';
import DateHistory from '../DateHistory';
import styles from '../index.module.scss';

const DateTask = ({ item }) => {
  const date = item.params.exec_stop
    ? format(new Date(item.params.exec_stop), DATE_FORMAT_UI, {
        locale: ru,
      })
    : null;

  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={date ? HISTORY_COMMAND.changeDate : 'удалил(а) срок'}
        />
        <DateHistory item={item} />
      </div>
      {date ? (
        <div className={styles.historyElemDate}>
          <Calendar />
          <span>Новый срок:</span>
          <span className={styles.spanDate}>
            {format(new Date(item.params.exec_stop), DATE_FORMAT_UI, {
              locale: ru,
            })}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default DateTask;
