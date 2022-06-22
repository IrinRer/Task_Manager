import React from 'react';
import { Select, Typography } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { changePriorityAction } from 'store/editTask/additionalFunctions/priority/thunk';
import { getTaskInfoPriorityName } from 'store/common/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectPopulatedPriorities } from 'store/common/priorities/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { PriorityName } from 'constants/types/common';
import { STYLES } from 'constants/common';
import { getPriorityName } from 'store/editTask/additionalFunctions/priority/selectors';
import { RIGHTS_NAMES } from 'constants/rights';
import { useGetRights } from 'customHooks/useGetRights';
import styles from './index.module.scss';

const { Text } = Typography;
const { Option } = Select;

const SelectPriority: React.FC = () => {
  const dispatch = useAppDispatch();
  const priorityValue = useAppSelector(selectPopulatedPriorities);
  const taskId = useAppSelector(getTaskId);
  const defaultPriorityName = useAppSelector(getTaskInfoPriorityName);
  const isRights = useGetRights(RIGHTS_NAMES.editPriority);

  const priorityAccept = useAppSelector(getPriorityName);

  const onChange = (checkedValues: string) => {
    dispatch(
      changePriorityAction({ priority: checkedValues, task_id: taskId }),
    );
  };

  return (
    <div className={styles.priority}>
      <Text className={styles.text}>Приоритет</Text>
      {isRights && (
        <Select
          placeholder="+ Добавить приоритет"
          defaultValue={priorityAccept}
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
      )}
      {!isRights && defaultPriorityName && (
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
