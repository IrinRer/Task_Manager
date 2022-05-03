import React, { useCallback, useMemo, useState } from 'react';

import { Select } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import { selectPopulatedUsers } from 'store/users/selectors';
import { fetchUsersAction } from 'store/users/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  DEBOUNCE_TIMEOUT,
  PARTICIPANTS_INPUT_MAX_LENGTH,
} from 'constants/common';
import { fetchTasksAction } from 'store/tasks/thunk';
import { IPopulatedUser, IUser } from 'store/users/types';
import {
  selectFilterUsers,
  selectFilterUsersNames,
} from 'store/filters/selectors';
import { usersUpdated } from 'store/filters/slice';
import { debounce } from 'lodash';
import FilterWrapper from '../../../Common/FilterWrapper';
import ParticipantTag from './ParticipantTag';
import styles from './index.module.scss';

const ParticipantsSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const allUsers: Array<IPopulatedUser> = useAppSelector(selectPopulatedUsers);
  const selectedUsers: Array<IUser> = useAppSelector(selectFilterUsers);
  const selectedUsersNames: Array<String> = useAppSelector(
    selectFilterUsersNames,
  );

  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (_, query: Array<IPopulatedUser>): void => {
    dispatch(usersUpdated(query));
    dispatch(fetchTasksAction());
  };

  const fetchUsers = useCallback(
    (query: string) => {
      dispatch(fetchUsersAction(query));
    },
    [dispatch],
  );

  const debouncedFetchUsers = useMemo(
    () => debounce((query: string) => fetchUsers(query), DEBOUNCE_TIMEOUT),
    [fetchUsers],
  );

  const handleSearch = (query: string) => {
    const trimmedQuery = query.slice(0, PARTICIPANTS_INPUT_MAX_LENGTH);

    setSearchValue(trimmedQuery);
    debouncedFetchUsers(trimmedQuery);
  };

  return (
    <FilterWrapper header="УЧАСТНИКИ">
      <Select
        mode="tags"
        showArrow
        suffixIcon={<CaretDownOutlined />}
        bordered={false}
        options={allUsers}
        className={styles.participants}
        dropdownClassName={styles.dropdown}
        searchValue={searchValue}
        value={selectedUsersNames}
        placeholder="Выберите..."
        notFoundContent="Ничего не найдено"
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <div className={styles.tags}>
        {selectedUsers.map((user) => (
          <ParticipantTag key={user.user_id} participant={user} />
        ))}
      </div>
    </FilterWrapper>
  );
};

export default ParticipantsSelect;
