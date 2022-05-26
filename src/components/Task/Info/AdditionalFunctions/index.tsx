import React from 'react';
import { withAdditionalFunctions } from 'HOC/AdditionalFunctions';
import {
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskInfoDateStop, getTaskInfoPriority } from 'store/common/task/selectors';
import { getTag } from 'store/editTask/additionalFunctions/tag/selectors';
import SelectPriority from './Priority';
import SelectDate from './Date';
import SelectTag from './Tag';

const AdditionalFunctions = () => {
  const dateStop = useAppSelector(getTaskInfoDateStop);
  const defaultPriority = useAppSelector(getTaskInfoPriority);
  const tagSelect = useAppSelector(getTag); 

  const PriorityTasks = withAdditionalFunctions(
    SelectPriority,
    ExclamationCircleOutlined,
    defaultPriority
  );
  const DateTasks = withAdditionalFunctions(SelectDate, ClockCircleOutlined, dateStop);
  const TagTasks = withAdditionalFunctions(SelectTag, TagOutlined, tagSelect);

  return (
    <>
      <DateTasks dateStop={dateStop}/>
      <PriorityTasks defaultPriority={defaultPriority}/>
      <TagTasks tagSelect={tagSelect}/>
    </>
  );
};

export default AdditionalFunctions;
