import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { useWindowSize } from 'customHooks/useWindowSize';
import UserAvatar from 'components/Common/UserAvatar';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../../ContextWrapper';
import styles from '../../index.module.scss';
import CommonComponentNoChildren from '../../Common/CommonComponent';

interface IProps {
  item: IHistoryItem;
}

const ChecklistAssign: FC<IProps> = ({ item }) => {
  const condition =
    item.command_code === HISTORY.checklistAssign
      ? HISTORY_COMMAND.assignChecklist
      : HISTORY_COMMAND.unassignChecklist;

  const size = useWindowSize();

  return (
    <ContextWrapperHistory item={item} text={condition}>
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        <CommonComponentNoChildren sizeValue={size.width || 0} />
      </div>
    </ContextWrapperHistory>
  );
};

export default ChecklistAssign;
