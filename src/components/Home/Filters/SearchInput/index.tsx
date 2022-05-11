import React, { ChangeEvent } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
import { searchUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import debounce from 'lodash/debounce';
import styles from './index.module.scss';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(searchUpdated(evt.target.value));
    dispatch(fetchTasksAction());
  }

  return (
    <Input
      id="search"
      allowClear
      placeholder="Поиск по задачам"
      maxLength={100}
      className={styles.search}
      onChange={debounce(handleChange, DEBOUNCE_TIMEOUT)}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchInput;
