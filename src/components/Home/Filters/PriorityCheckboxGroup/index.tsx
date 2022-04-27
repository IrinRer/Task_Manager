import React from 'react';

import { Checkbox } from 'antd';
import { priorityUpdated } from 'store/filters/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectPopulatedPriorities } from 'store/common/priorities/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { selectPriorityCheckboxesValues } from 'store/filters/selectors';
import { fetchTasksAction } from 'store/tasks/thunk';
import { IPopulatedPriority } from 'store/common/priorities/types';
import filterStyles from '../index.module.scss';
import FilterWrapper from '../../../Common/FilterWrapper';

const PriorityCheckboxGroup: React.FC = () => {
  const dispatch = useAppDispatch();

  const priorityCheckboxes: Array<IPopulatedPriority> = useAppSelector(
    selectPopulatedPriorities,
  );

  const checkboxValues: Array<string> = useAppSelector(
    selectPriorityCheckboxesValues,
  );

  const handleChange = (value: Array<string>) => {
    dispatch(priorityUpdated(value));
    dispatch(fetchTasksAction());
  };

  return (
    <FilterWrapper header="ПРИОРИТЕТ">
      <Checkbox.Group
        className={filterStyles.checkboxGroup}
        options={priorityCheckboxes}
        value={checkboxValues}
        onChange={handleChange}
      />
    </FilterWrapper>
  );
};

export default PriorityCheckboxGroup;
