import React from 'react';

import { Checkbox } from 'antd';
import { statusesUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectStatusCheckboxesValues } from 'store/filters/selectors';
import { fetchTasksAction } from 'store/tasks/thunk';
import { selectPopulatedStatuses } from 'store/common/statuses/selectors';
import { IPopulatedStatus } from 'store/common/statuses/types';
import filterStyles from '../index.module.scss';
import FilterWrapper from '../../../Common/FilterWrapper';

const StatusCheckboxGroup: React.FC = () => {
  const dispatch = useAppDispatch();

  const statusCheckboxes: Array<IPopulatedStatus> = useAppSelector(
    selectPopulatedStatuses,
  );

  const checkboxValues: Array<string> = useAppSelector(
    selectStatusCheckboxesValues,
  );

  const handleChange = (value: Array<string>) => {
    dispatch(statusesUpdated(value));
    dispatch(fetchTasksAction());
  };

  return (
    <FilterWrapper header="СТАТУС">
      <Checkbox.Group
        className={filterStyles.checkboxGroup}
        options={statusCheckboxes}
        onChange={handleChange}
        value={checkboxValues}
      />
    </FilterWrapper>
  );
};

export default StatusCheckboxGroup;
