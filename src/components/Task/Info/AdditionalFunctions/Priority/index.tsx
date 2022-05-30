import React from 'react';
import { Select, Typography } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { changePriorityAction } from 'store/editTask/additionalFunctions/priority/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectPopulatedPriorities } from 'store/common/priorities/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { PriorityName } from 'constants/types/common';
import { STYLES } from 'constants/common';

import styles from './index.module.scss';

const { Text } = Typography;
const { Option } = Select;

interface IProps {
  defaultPriority: string;
}

const SelectPriority: React.FC<IProps> = ({ defaultPriority }) => {
  const dispatch = useAppDispatch();
  const priorityValue = useAppSelector(selectPopulatedPriorities);
  const taskId = useAppSelector(getTaskId);

  const onChange = (checkedValues: string) => {
    dispatch(
      changePriorityAction({ priority: checkedValues, task_id: taskId }),
    );
  };

  return (
    <div className={styles.priority}>
      <Text className={styles.text}>Приоритет</Text>
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
    </div>
  );
};

export default SelectPriority;
