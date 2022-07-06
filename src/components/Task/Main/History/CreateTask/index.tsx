import UserAvatar from 'components/Common/UserAvatar';
import { HISTORY_COMMAND } from 'constants/history/common';
import { useWindowSize } from 'customHooks/useWindowSize';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import CommonComponentNoChildren from '../Common/CommonComponent';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const CreateTask: FC<IProps> = ({ item }) => {
  const size = useWindowSize();

  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.createTask}>
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        <CommonComponentNoChildren sizeValue={size.width || 0} />
      </div>
    </ContextWrapperHistory>
  );
};

export default CreateTask;
