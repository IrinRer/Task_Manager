import { HISTORY_COMMAND } from 'constants/history/common';
import { useWindowSize } from 'customHooks/useWindowSize';
import UserAvatar from 'components/Common/UserAvatar';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';
import CommonComponentNoChildren from '../Common/CommonComponent';

interface IProps {
  item: IHistoryItem;
}

const Description: FC<IProps> = ({ item }) => {
  const size = useWindowSize();
  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.changeDescription}>
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        <CommonComponentNoChildren sizeValue={size.width || 0} />
      </div>
    </ContextWrapperHistory>
  );
};

export default Description;
