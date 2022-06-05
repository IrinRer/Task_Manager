import React from 'react';
import { withAdditionalFunctions } from 'HOC/AdditionalFunctions';
import {
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskInfoDateStop,
  getTaskInfoPriority,
} from 'store/common/task/selectors';
import { getTag } from 'store/editTask/additionalFunctions/tag/selectors';
import { ITag } from 'store/common/tags/types';
import SelectPriority from './Priority';
import SelectDate from './Date';
import SelectTag from './Tag';

const AdditionalFunctions = () => {
  const dateStop = useAppSelector(getTaskInfoDateStop);
  const defaultPriority = useAppSelector(getTaskInfoPriority);
  const tagSelect = useAppSelector(getTag);

  type TPriorityTasks = {
    defaultPriority: string | undefined;
  };

  type TDateTasks = {
    dateStop: string | undefined;
  };

  type TTagTasks = {
    tagSelect: ITag[] | undefined;
  };

  const PriorityTasks = withAdditionalFunctions<string, TPriorityTasks>(
    SelectPriority,
    ExclamationCircleOutlined,
    defaultPriority || '',
  );
  const DateTasks = withAdditionalFunctions<string, TDateTasks>(
    SelectDate,
    ClockCircleOutlined,
    dateStop || '',
  );
  const TagTasks = withAdditionalFunctions<ITag[] | undefined, TTagTasks>(
    SelectTag,
    TagOutlined,
    tagSelect,
  );

  console.log(tagSelect)

  return (
    <>
      <DateTasks dateStop={dateStop} />
      <PriorityTasks defaultPriority={defaultPriority} />
      <TagTasks tagSelect={tagSelect} />
    </>
  );
};

export default AdditionalFunctions;
