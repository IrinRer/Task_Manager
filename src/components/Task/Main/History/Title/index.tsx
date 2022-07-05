import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import UserAvatar from 'components/Common/UserAvatar';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const Title: FC<IProps> = ({ item }) => {
  const component = useDefineAdaptive(
    <div className={styles.historyElemItemTitle}>
      <span>
        Новый заголовок:&nbsp;
        <b>{item.params.title}</b>
      </span>
    </div>,
  );
  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.changeTitle}>
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        {component}
      </div>
    </ContextWrapperHistory>
  );
};

export default Title;
