import {
  DEBOUNCE_TIMEOUT,
  PARTICIPANTS_INPUT_MAX_LENGTH,
} from 'constants/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { fetchUsersAction } from 'store/users/thunk';

export type TOption = {
  value: string;
  children: string;
};

const useSelectOptions = () => {
  const dispatch = useAppDispatch();
  const [queryValue, setQueryValue] = useState<string>('');

  const filterOption = (input: string, option: TOption): boolean => {
    return option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const filterSort = (optionA: TOption, optionB: TOption): number => {
    return optionA!.children
      .toLowerCase()
      .localeCompare(optionB!.children.toLowerCase());
  };

  const getSearchValue = (query: string): string => {
    if (query.length > PARTICIPANTS_INPUT_MAX_LENGTH) {
      return query.slice(0, PARTICIPANTS_INPUT_MAX_LENGTH);
    }
    return query;
  };

  const onSearch = (query: string) => {
    setQueryValue(getSearchValue(query));
  };

  const onBlur = () => {
    setQueryValue('');
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
    setQueryValue(getSearchValue(query));
    if (query.length <= PARTICIPANTS_INPUT_MAX_LENGTH && query !== queryValue) {
      debouncedFetchUsers(queryValue);
    }
  };

  return {
    common: {
      maxTagCount: 1,
      listHeight: 118,
      showSearch: true,
      onSearch,
      onBlur,
      searchValue: queryValue,
      autoFocus: true,
      open: true,
      placeholder: 'Искать участников',
      optionFilterProp: 'children',
      defaultOpen: true,
      filterOption,
      filterSort,
    },
    particular: {
      handleSearch,
    },
  };
};

export default useSelectOptions;
