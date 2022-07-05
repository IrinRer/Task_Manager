import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import UserAvatar from 'components/Common/UserAvatar';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import CustomTag from 'components/Common/CustomTag';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const TagHistory: FC<IProps> = ({ item }) => {
  const condition = item.command_code === HISTORY.tagAssign;

  const component = useDefineAdaptive(
    condition ? (
      <div className={styles.historyElemItem}>
        <CustomTag
          title={item.params.tag.name}
          color={item.params.tag.color}
          closable={false}
        />
      </div>
    ) : null,
  );

  return (
    <ContextWrapperHistory
      item={item}
      text={condition ? HISTORY_COMMAND.addTag : HISTORY_COMMAND.unassignTag}
    >
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        {component}
      </div>
    </ContextWrapperHistory>
  );
};

export default TagHistory;
