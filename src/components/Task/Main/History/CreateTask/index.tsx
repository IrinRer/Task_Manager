import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import CommonComponent from '../Common';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const CreateTask: FC<IProps> = ({ item }) => (
  <ContextWrapperHistory item={item} text={HISTORY_COMMAND.createTask}>
    <div className={styles.history}>
      <CommonComponent />
    </div>
  </ContextWrapperHistory>
);

export default CreateTask;
