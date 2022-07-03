import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import CommonComponentNoChildren from '../Common/CommonComponent';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const CreateTask: FC<IProps> = ({ item }) => (
  <ContextWrapperHistory item={item} text={HISTORY_COMMAND.createTask}>
    <div className={styles.history}>
      <CommonComponentNoChildren />
    </div>
  </ContextWrapperHistory>
);

export default CreateTask;
