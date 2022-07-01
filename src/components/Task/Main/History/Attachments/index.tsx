import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
// import { getAttachments } from 'store/history/selectors';
import { IHistoryItem } from 'store/history/types';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { attachmentsAll } from 'store/history/selectors';
import { viewFileHistory } from 'store/history/thunk';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';
import CommonComponent from '../Common';

interface IProps {
  item: IHistoryItem;
}

const Attachments: FC<IProps> = ({ item }) => {
  const attachmentsImg = useAppSelector(attachmentsAll);

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

        {HISTORY_COMMAND.assignFile ? (
          <div className={styles.historyElemItem}>
            {attachmentsImg.map(({ url, name }) => {
              if (name === item.params.storage_file.name_original) {
                return (
                  <div className={styles.wrapper_img}>
                    <img src={url} alt={name} className={styles.img} />
                    <p>{name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : HISTORY_COMMAND.unassignFile}
      </div>
    </ContextWrapperHistory>
  );
};

export default Attachments;
