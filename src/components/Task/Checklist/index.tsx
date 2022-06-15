import React from 'react';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckList } from 'store/editTask/selectors';
import { RIGHTS_NAMES } from 'constants/rights';
import { useGetRights } from 'customHooks/useGetRights';
import CheckListAddNewItem from './AddNewItem';
import CheckListItems from './Items';
import CheckListHeader from './Header';
import CheckListProgress from './Progress';
import styles from './index.module.scss';

const Checklist: React.FC = () => {
  const checkList = useAppSelector(getCheckList);
  const isRights = useGetRights(RIGHTS_NAMES.editChecklistItem);

  if (!checkList) {
    return null;
  }

  return (
    <div className={styles.checklist}>
      <CheckListHeader />
      <CheckListProgress />
      {checkList.items?.length && <CheckListItems items={checkList.items} />}
      {isRights && <CheckListAddNewItem />}
    </div>
  );
};

export default Checklist;
