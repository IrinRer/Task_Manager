import React from 'react';
import { ICheckListItem } from 'store/common/task/types';
import CheckListItem from './Item';
import styles from './index.module.scss';

interface IProps {
  items: Array<ICheckListItem>;
}

const CheckListItems: React.FC<IProps> = ({ items }) => {
  return (
    <div className={styles.checklistItems}>
      {items.map((checkListItem) => (
        <CheckListItem
          key={checkListItem.check_list_item_id}
          checkListItem={checkListItem}
        />
      ))}
    </div>
  );
};

export default CheckListItems;
