import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { IHistoryItem } from 'store/history/types';
import UserAvatar from 'components/Common/UserAvatar';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import { attachmentsAll } from 'store/history/selectors';
import shapeAttachment from 'assets/icons/shapeAttachment.svg';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const Attachments: FC<IProps> = ({ item }) => {
  const attachmentsImg = useAppSelector(attachmentsAll);
  const condition =
    item.command_code === HISTORY.fileAssign
      ? HISTORY_COMMAND.assignFile
      : HISTORY_COMMAND.unassignFile;

  const component = useDefineAdaptive(
    <div className={styles.historyElemAttach}>
      {attachmentsImg.map(({ url, name, type, size }) => {
        if (name === item.params.storage_file.name_original) {
          return type.includes('image') ? (
            <div className={styles.wrapper_img} key={name}>
              <img src={url} alt={name} className={styles.img} />
              <p>{name}</p>
            </div>
          ) : (
            <div className={styles.wrapper_doc} key={name}>
              <div className={styles.wrapper_icon}>
                <img src={shapeAttachment} alt="attachmentIcon" />
              </div>
              <div className={styles.wrapper_text}>
                <p className={styles.text_name}>{name}</p>
                <p className={styles.text_size}>{`${(
                  Number(size) / 1024
                ).toFixed(2)} Kb`}</p>
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className={styles.support} />
    </div>,
  );

  return (
    <ContextWrapperHistory item={item} text={condition}>
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        {component}
      </div>
    </ContextWrapperHistory>
  );
};

export default React.memo(Attachments);
