import React from 'react';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList, getIsTaskEditable } from 'store/editTask/selectors';
import CheckListAddNewItem from './CheckListAddNewItem';
import CheckListItems from './CheckListItems';
import CheckListHeader from './CheckListHeader';
import CheckListProgress from './CheckListProgress';
import styles from './index.module.scss';

const Checklist: React.FC = () => {
  const checkList = useAppSelector(getCheckList);
  const isTaskEditable = useAppSelector(getIsTaskEditable);

  if (!checkList) {
    return null;
  }

  return (
    <div className={styles.checklist}>
      <CheckListHeader />
      <CheckListProgress />
      {checkList.items.length > 0 && <CheckListItems items={checkList.items} />}
      {isTaskEditable && <CheckListAddNewItem />}
    </div>
  );
};

export default Checklist;
