import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckListTitle } from 'store/editTask/selectors';
import { setCheckListTitle } from 'store/editTask/checkLists/setCheckListTitle/thunk';
import Spinner from 'components/Common/Spinner';
import { Input } from 'antd';
import { isSetCheckListTitleLoading } from 'store/editTask/checkLists/setCheckListTitle/selectors';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

const CheckListTitle = () => {
  const dispatch = useAppDispatch();

  const title: string = useAppSelector(getCheckListTitle);
  const isTitleLoading: boolean = useAppSelector(isSetCheckListTitleLoading);
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.addChecklist);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title || '');

  const handleTitleClick = () => setIsEditMode(true);

  const handleInputSubmit = () => {
    if (newTitle && newTitle !== title) {
      dispatch(setCheckListTitle(newTitle));
    }

    if (!newTitle) {
      setNewTitle(title);
    }

    setIsEditMode(false);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(evt.target.value);
  };

  if (!isRights) {
    return <h4 className={styles.title}>{title}</h4>;
  }

  if (isTitleLoading) {
    return <Spinner size="small" className={styles.spinner} />;
  }

  return isEditMode ? (
    <Input
      autoFocus
      bordered={false}
      maxLength={50}
      className={styles.input}
      value={newTitle}
      onChange={handleInputChange}
      onBlur={handleInputSubmit}
      onPressEnter={handleInputSubmit}
    />
  ) : (
    <button type="button" className={styles.button} onClick={handleTitleClick}>
      <h4 className={styles.title}>{title}</h4>
    </button>
  );
};

export default CheckListTitle;
