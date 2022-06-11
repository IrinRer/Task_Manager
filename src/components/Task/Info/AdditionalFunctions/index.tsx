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
import { getPriorityName } from 'store/editTask/additionalFunctions/priority/selectors';
import { getDateStop } from 'store/editTask/additionalFunctions/date/selectors';
import SelectPriority from './Priority';
import SelectDate from './Date';
import SelectTag from './Tag';
import styles from './index.module.scss';

const AdditionalFunctions = () => {
  const dateStop = useAppSelector(getTaskInfoDateStop);
  const defaultPriority = useAppSelector(getTaskInfoPriority);
  const tagSelect = useAppSelector(getTag);
  const accepPriority = useAppSelector(getPriorityName);
  const accepDate = useAppSelector(getDateStop);

  type TPriorityTasks = {
    defaultPriority?: string;
    accepPriority?: string;
  };

  type TDateTasks = {
    dateStop?: string;
    accepDate?: string;
  };

  type TTagTasks = {
    tagSelect?: ITag[];
  };

  const PriorityTasks = withAdditionalFunctions<string, TPriorityTasks>(
    SelectPriority,
    ExclamationCircleOutlined,
    defaultPriority || '',
    accepPriority || '',
  );
  const DateTasks = withAdditionalFunctions<string, TDateTasks>(
    SelectDate,
    ClockCircleOutlined,
    dateStop || '',
    accepDate || '',
  );
  const TagTasks = withAdditionalFunctions<ITag[] | undefined, TTagTasks>(
    SelectTag,
    TagOutlined,
    tagSelect,
    tagSelect,
  );

  return (
    <div className={styles.wrapper} >
      <DateTasks />
      <PriorityTasks />
      <TagTasks />
    </div>
  );
};

export default AdditionalFunctions;
