import React, { ChangeEvent, useMemo } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
import { searchUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import { debounce } from 'lodash';
import styles from './index.module.scss';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const debouncedHandleChange = useMemo(() => {
    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
      dispatch(searchUpdated(evt.target.value));
      dispatch(fetchTasksAction());
    }

    return debounce(handleChange, DEBOUNCE_TIMEOUT);
  }, [dispatch]);

  return (
    <Input
      id="search"
      allowClear
      placeholder="Поиск по задачам"
      maxLength={100}
      className={styles.search}
      onChange={debouncedHandleChange}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchInput;
