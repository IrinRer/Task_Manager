import { notification } from 'antd';
import { isValidPageSize } from 'constants/rules';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  pageSize: number;
  handleChange: (newTasksOnPage: number) => void;
}
const PageSize: React.FC<IProps> = ({ pageSize, handleChange }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newPageSize, setNewPageSize] = useState(pageSize.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
    setNewPageSize(pageSize.toString());
  }, [editMode, pageSize]);

  const handleInput: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (isValidPageSize(e.target.value)) {
      setNewPageSize(e.target.value);
    } else {
      notification.warn({ message: 'Введите число от 1 до 100' });
    }
  };

  const handleClick = (e: any) => {
    setEditMode(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (true) {
      case e.key === 'Enter' && Number(newPageSize) > 0: {
        handleChange(Number(newPageSize));
        setEditMode(false);
        break;
      }
      case e.key === 'Enter' && Number(newPageSize) <= 0: {
        notification.warn({
          message: 'Неверное число',
        });
        break;
      }
      case e.key === 'Escape': {
        setNewPageSize(pageSize.toString());
        setEditMode(false);
        break;
      }

      default:
        break;
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
