import React, { ChangeEvent, useCallback, useMemo } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
import { searchUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import { debounce } from 'lodash';
import styles from './index.module.scss';
import { useAppSelector } from '../../../../customHooks/redux/useAppSelector';
import { selectSearchQueryValue } from '../../../../store/filters/selectors';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector(selectSearchQueryValue);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUpdated(evt.target.value));
    debouncedFetchTasks();
  };

  const fetchTasks = useCallback(() => {
    dispatch(fetchTasksAction());
  }, [dispatch]);

  const debouncedFetchTasks = useMemo(
    () => debounce(() => fetchTasks(), DEBOUNCE_TIMEOUT),
    [fetchTasks],
  );

  return (
    <Input
      id="search"
      allowClear
      placeholder="Поиск по задачам"
      maxLength={100}
      className={styles.search}
      value={searchValue}
      onChange={handleChange}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchInput;
