import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';
import CommonComponent from '../Common';

interface IProps {
  item: IHistoryItem;
}

const Attachments: FC<IProps> = ({ item }) => {
  return (
    <ContextWrapperHistory
      item={item}
      text={
        item.command_code === HISTORY.fileAssign
          ? HISTORY_COMMAND.assignFile
          : HISTORY_COMMAND.unassignFile
      }
    >
      <div className={styles.history}>
        <CommonComponent />

        {HISTORY_COMMAND.assignFile ? <div>картинка</div> : null}
        {/* <div className={styles.historyElemItem}>
            
          </div> */}
      </div>
    </ContextWrapperHistory>
  );
};

export default Attachments;
