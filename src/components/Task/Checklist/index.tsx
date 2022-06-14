import React from 'react';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList, getIsTaskEditable } from 'store/editTask/selectors';
import CheckListAddNewItem from './AddNewItem';
import CheckListItems from './Items';
import CheckListHeader from './Header';
import CheckListProgress from './Progress';
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
      {checkList.items && <CheckListItems items={checkList.items} />}
      {isTaskEditable && <CheckListAddNewItem />}
    </div>
  );
};

export default Checklist;
