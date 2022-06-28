import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { HISTORY_COMMAND } from 'constants/history/common';
import { DATE_FORMAT_UI } from 'constants/common';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../index.module.scss';
import ContextWrapperHistory from '../ContextWrapper';
import CommonComponent from '../Common';

interface IProps {
  item: IHistoryItem;
}

const DateTask: FC<IProps> = ({ item }) => {
  const date = item.params.exec_stop
    ? format(new Date(item.params.exec_stop), DATE_FORMAT_UI, {
        locale: ru,
      })
    : null;

  return (
    <ContextWrapperHistory
      item={item}
      text={date ? HISTORY_COMMAND.changeDate : 'удалил(а) срок'}
    >
      <div className={styles.history}>
        <CommonComponent />

        {date ? (
          <div className={styles.historyElemDate}>
            <div className={styles.wrapper_date_icon}>
              <Calendar />
              <span>Новый срок:</span>
            </div>
            <span className={styles.font_weight}>
              {format(new Date(item.params.exec_stop), DATE_FORMAT_UI, {
                locale: ru,
              })}
            </span>
          </div>
        ) : null}
      </div>
    </ContextWrapperHistory>
  );
};

export default DateTask;
