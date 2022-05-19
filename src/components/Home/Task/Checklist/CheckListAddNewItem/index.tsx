import { Input } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { addCheckListItemAction } from 'store/editTask/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import styles from './index.module.scss';

const CheckListAddNewItem = () => {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleAddCheckListItem = () => {
    if (inputValue) {
      dispatch(addCheckListItemAction(inputValue));
      setInputValue('');
    }

    setIsEditMode(false);
  };

  const handleAddButtonClick = () => {
    setIsEditMode(true);
  };

  if (isEditMode) {
    return (
      <Input
        maxLength={100}
        className={styles.newItemInput}
        value={inputValue}
        autoFocus
        onChange={handleInputChange}
        onBlur={handleAddCheckListItem}
        onPressEnter={handleAddCheckListItem}
      />
    );
  }

  return (
    <button
      type="button"
      className={styles.newItemButton}
      onClick={handleAddButtonClick}
    >
      <PlusIcon className={styles.newItemButtonIcon} />
      <p className={styles.newItemButtonText}>Добавить новый пункт</p>
    </button>
  );
};

export default CheckListAddNewItem;
