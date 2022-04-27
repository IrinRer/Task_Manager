import React, { useMemo } from 'react';

import { Select } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import { selectPopulatedUsers } from 'store/users/selectors';
import { fetchUsersAction } from 'store/users/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
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

  const handleChange = (_, query: Array<IPopulatedUser>) => {
    dispatch(usersUpdated(query));
    dispatch(fetchTasksAction());
  };

  const debouncedHandleSearch = useMemo(() => {
    function handleSearch(query: string) {
      dispatch(fetchUsersAction(query));
    }

    return debounce(handleSearch, DEBOUNCE_TIMEOUT);
  }, [dispatch]);

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
        value={selectedUsersNames}
        placeholder="Выберите..."
        notFoundContent="Ничего не найдено"
        onChange={handleChange}
        onSearch={debouncedHandleSearch}
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
