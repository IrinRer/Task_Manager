import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';
import CommonComponentNoChildren from '../Common/CommonComponent';

interface IProps {
  item: IHistoryItem;
}

const Description: FC<IProps> = ({ item }) => {
  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.changeDescription}>
      <div className={styles.history}>
        <CommonComponentNoChildren/>
      </div>
    </ContextWrapperHistory>
  );
};

export default Description;
