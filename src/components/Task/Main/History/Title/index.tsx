import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
  width: number;
}

const Title: FC<IProps> = ({ item, width }) => {
  const component = useDefineAdaptive(width,
    <div className={styles.historyElemItem}>
      <span>Новый заголовок:&nbsp;&nbsp;</span>
      <span className={styles.font_weight}>{item.params.title}</span>
    </div>,
  );
  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.changeTitle}>
      <div className={styles.history}>{component}</div>
    </ContextWrapperHistory>
  );
};

export default Title;
