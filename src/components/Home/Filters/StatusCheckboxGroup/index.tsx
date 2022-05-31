import React from 'react';

import { Checkbox } from 'antd';
import { statusesUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectStatusCheckboxesValues } from 'store/filters/selectors';
import { fetchTasksAction } from 'store/tasks/thunk';
import { selectPopulatedStatuses } from 'store/common/statuses/selectors';
import { IPopulatedStatus } from 'store/common/statuses/types';
import FilterWrapper from 'components/Common/FilterWrapper';
import StatusCounter from './StatusCounter';
import filterStyles from '../index.module.scss';
import styles from './index.module.scss';

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
        onChange={handleChange}
        value={checkboxValues}
      >
        {statusCheckboxes.map((checkbox) => (
          <div className={styles.checkboxWrapper} key={checkbox.task_status_id}>
            <Checkbox value={checkbox.value} className={styles.checkbox}>
              <p>{checkbox.name}</p>
            </Checkbox>
            <StatusCounter task_status_id={checkbox.task_status_id} />
          </div>
        ))}
      </Checkbox.Group>
    </FilterWrapper>
  );
};

export default StatusCheckboxGroup;
