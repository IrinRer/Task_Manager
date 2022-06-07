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
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getPriorityName } from 'store/editTask/additionalFunctions/priority/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';


const { Text } = Typography;
const { Option } = Select;

interface IProps {
  defaultPriority: string | undefined;
}

const SelectPriority: React.FC<IProps> = ({ defaultPriority }) => {
  const dispatch = useAppDispatch();
  const priorityValue = useAppSelector(selectPopulatedPriorities);
  const taskId = useAppSelector(getTaskId);
  const defaultPriorityName = useAppSelector(getTaskInfoPriorityName);
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editPriority);

  const priorityAccept = useAppSelector(getPriorityName);

  const onChange = (checkedValues: string) => {
    dispatch(
      changePriorityAction({ priority: checkedValues, task_id: taskId }),
    );
  };
  
  console.log(priorityAccept);
  console.log(defaultPriority);
  
  return (
    <div className={styles.priority}>
      <Text className={styles.text}>Приоритет</Text>
      {isRights ? (
        <Select
          placeholder="+ Добавить приоритет"
          defaultValue={priorityAccept || defaultPriority || undefined}
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
