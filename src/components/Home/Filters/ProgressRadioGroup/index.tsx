import React from 'react';

import { Radio, RadioChangeEvent } from 'antd';
import { progressUpdated } from 'store/filters/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectProgresses } from 'store/common/progresses/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { selectProgressValue } from 'store/filters/selectors';
import { fetchTasksAction } from 'store/tasks/thunk';
import { IProgress, TProgressValue } from 'store/common/progresses/types';
import FilterWrapper from 'components/Common/FilterWrapper';
import styles from './index.module.scss';

const ProgressRadioGroup: React.FC = () => {
  const progresses: Array<IProgress> = useAppSelector(selectProgresses);
  const progressValue: TProgressValue = useAppSelector(selectProgressValue);
  const dispatch = useAppDispatch();

  const handleChange = (evt: RadioChangeEvent) => {
    dispatch(progressUpdated(evt.target.value));
    dispatch(fetchTasksAction());
  };

  return (
    <FilterWrapper header="СТЕПЕНЬ ГОТОВНОСТИ">
      <Radio.Group
        className={styles.progressGroup}
        options={progresses}
        onChange={handleChange}
        optionType="button"
        buttonStyle="solid"
        value={progressValue}
      />
    </FilterWrapper>
  );
};

export default ProgressRadioGroup;
