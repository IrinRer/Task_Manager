import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { HISTORY_COMMAND } from 'constants/history/common';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import { DATE_FORMAT_UI } from 'constants/common';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from '../index.module.scss';
import ContextWrapperHistory from '../ContextWrapper';

interface IProps {
  item: IHistoryItem;
  width: string;
}

const DateTask: FC<IProps> = ({ item, width}) => {
  const date = item.params.exec_stop
    ? format(new Date(item.params.exec_stop), DATE_FORMAT_UI, {
        locale: ru,
      })
    : null;

  const condition = date ? HISTORY_COMMAND.changeDate : 'удалил(а) срок';
  const component = useDefineAdaptive(width,
    date ? (
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
    ) : null,
  );

  return (
    <ContextWrapperHistory item={item} text={condition}>
      <div className={styles.history}>{component}</div>
    </ContextWrapperHistory>
  );
};

export default DateTask;
