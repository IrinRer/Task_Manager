import { notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  pageSize: number;
  handleChange: (newTasksOnPage: number) => void;
}
const PageSize: React.FC<IProps> = ({ pageSize, handleChange }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newPageSize, setNewPageSize] = useState<string>(pageSize.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  const handleInput: React.ChangeEventHandler = (e: any) => {
    if (validNumber(e.target.value)) {
      setNewPageSize(e.target.value);
    } else {
      notification.warn({ message: 'Введите число от 1 до 100' });
    }
  };

  const handleClick = (e: any) => {
    setEditMode(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.key === 'Enter') {
        if (Number(newPageSize) > 0) {
          handleChange(Number(newPageSize));
          setEditMode(false);
        }
      } else if (e.key === 'Escape') {
        setNewPageSize(pageSize.toString());
        setEditMode(false);
      } else {
        notification.warn({
          message: 'Неверное число',
        });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (Number(newPageSize) > 0) {
      handleChange(Number(newPageSize));
      setEditMode(false);
    } else {
      setNewPageSize(pageSize.toString());
      setEditMode(false);
    }
  };

  const validNumber = (value: string): boolean => {
    return (
      (/^\d{1,3}$/.test(value) && Number(value) > 0 && Number(value) <= 100) ||
      value.length === 0
    );
  };
  return (
    <div className={styles.pageSize}>
      {editMode ? (
        <input
          type="text"
          ref={inputRef}
          value={newPageSize}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />
      ) : (
        <span onClick={handleClick}>{pageSize}</span>
      )}
    </div>
  );
};

export default PageSize;
