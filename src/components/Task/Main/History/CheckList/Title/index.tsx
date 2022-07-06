import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import UserAvatar from 'components/Common/UserAvatar';
import { IHistoryItem } from 'store/history/types';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import ContextWrapperHistory from '../../ContextWrapper';
import styles from '../../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const ChecklistTitle: FC<IProps> = ({ item }) => {
  const component = useDefineAdaptive(
    <div className={styles.historyElemItem}>
      <span>Новое название:&nbsp;&nbsp;</span>
      <span className={styles.font_weight}>{item.params.title}</span>
    </div>,
  );
  return (
    <ContextWrapperHistory
      item={item}
      text={HISTORY_COMMAND.сhangeTitleChecklist}
    >
      <div className={styles.history}>
        {component}
        <UserAvatar user={item.user} />
      </div>
    </ContextWrapperHistory>
  );
};

export default ChecklistTitle;
