import React from 'react';
import { Select, Typography } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { changePriorityAction } from 'store/editTask/additionalFunctions/priority/thunk';
import {
  getTaskInfoPriority,
  getTaskInfoPriorityName,
} from 'store/common/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectPopulatedPriorities } from 'store/common/priorities/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { PriorityName } from 'constants/types/common';

import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import styles from './index.module.scss';

const { Text } = Typography;
const { Option } = Select;

const SelectPriority = () => {
  const dispatch = useAppDispatch();
  const priorityValue = useAppSelector(selectPopulatedPriorities);
  const taskId = useAppSelector(getTaskId);

  const STYLES: string[] = ['high', 'middle', 'low'];

  const defaultPriority = useAppSelector(getTaskInfoPriority);
  const defaultPriorityName = useAppSelector(getTaskInfoPriorityName);

  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, 'priority');

  const onChange = (checkedValues: string) => {
    dispatch(
      changePriorityAction({ priority: checkedValues, task_id: taskId }),
    );
  };

  return (
    <div className={styles.priority}>
      <Text className={styles.text}>Приоритет</Text>
      {!isRights ? (
        <Select
          placeholder="+ Добавить приоритет"
          defaultValue={defaultPriority}
          showArrow={false}
          bordered={false}
          allowClear
          dropdownClassName={styles.drop}
          onChange={onChange}
        >
          {priorityValue.map(({ task_priority_id: id, name }) => {
            return (
              <Option value={id} key={id}>
                <div className={styles[STYLES[PriorityName[name]]]} />
                {name}
              </Option>
            );
          })}
        </Select>
      ) : (
        <div className={styles.noedit}>
          <div
            className={styles[STYLES[PriorityName[defaultPriorityName || '']]]}
          />
          <span>{defaultPriorityName}</span>
        </div>
      )}
    </div>
  );
};

export default SelectPriority;
