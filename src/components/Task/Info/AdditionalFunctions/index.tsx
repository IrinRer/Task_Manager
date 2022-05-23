import React from 'react';
import { withAdditionalFunctions } from 'HOC/AdditionalFunctions';
import {
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  TagOutlined,
} from '@ant-design/icons';
import SelectPriority from './Priority';
import SelectDate from './Date';
import SelectTag from './Tag';

const AdditionalFunctions = () => {
  const PriorityTasks = withAdditionalFunctions(
    SelectPriority,
    ExclamationCircleOutlined,
  );
  const DateTasks = withAdditionalFunctions(SelectDate, ClockCircleOutlined);
  const TagTasks = withAdditionalFunctions(SelectTag, TagOutlined);

  return (
    <>
      <DateTasks />
      <PriorityTasks />
      <TagTasks />
    </>
  );
};

export default AdditionalFunctions;
