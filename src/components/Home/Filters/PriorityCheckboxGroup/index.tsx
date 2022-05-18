import React from 'react';

import { Checkbox } from 'antd';
import { priorityUpdated } from 'store/filters/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectPopulatedPriorities } from 'store/common/priorities/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { selectPriorityCheckboxesValues } from 'store/filters/selectors';
import { fetchTasksAction } from 'store/tasks/thunk';
import { IPopulatedPriority } from 'store/common/priorities/types';
import classnames from 'classnames';
import filterStyles from '../index.module.scss';
import styles from './index.module.scss';
import FilterWrapper from '../../../Common/FilterWrapper';
import PriorityCheckboxLabel from './PriorityCheckboxLabel';

const PriorityCheckboxGroup: React.FC = () => {
  const dispatch = useAppDispatch();

  const className = classnames(
    filterStyles.checkboxGroup,
    styles.priorityCheckboxGroup,
  );

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
        className={className}
        value={checkboxValues}
        onChange={handleChange}
      >
        {priorityCheckboxes.map((checkbox) => (
          <Checkbox value={checkbox.value} key={checkbox.task_priority_id}>
            <PriorityCheckboxLabel
              color={checkbox.color}
              label={checkbox.label}
            />
          </Checkbox>
        ))}
      </Checkbox.Group>
    </FilterWrapper>
  );
};

export default PriorityCheckboxGroup;
