import React, { ChangeEvent } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { fetchTasksAction } from 'store/tasks/thunk';
import { selectSearchQueryValue } from 'store/filters/selectors';
import styles from './index.module.scss';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(selectSearchQueryValue);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUpdated(evt.target.value));
    dispatch(fetchTasksAction());
  };

  return (
    <Input
      id="search"
      allowClear
      value={inputValue}
      placeholder="Поиск по задачам"
      maxLength={100}
      className={styles.search}
      onChange={handleChange}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchInput;
