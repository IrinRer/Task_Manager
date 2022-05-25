import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getCheckListTitle,
  getIsCheckListTitleLoading,
  getIsTaskEditable,
} from 'store/editTask/selectors';
import { setCheckListTitle } from 'store/editTask/thunk';
import Spinner from 'components/Common/Spinner';
import { Input } from 'antd';
import styles from './index.module.scss';

const CheckListTitle = () => {
  const dispatch = useAppDispatch();

  const title: string = useAppSelector(getCheckListTitle);
  const isTaskEditable: boolean = useAppSelector(getIsTaskEditable);
  const isTitleLoading: boolean = useAppSelector(getIsCheckListTitleLoading);

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

  if (!isTaskEditable) {
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
