import React from 'react';

import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { attachmentsUpdated } from 'store/filters/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectAttachmentCheckboxValue } from 'store/filters/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import FilterWrapper from 'components/Common/FilterWrapper';
import filterStyles from '../index.module.scss';

const AttachmentCheckbox: React.FC = () => {
  const dispatch = useAppDispatch();
  const checkboxValue: boolean = useAppSelector(selectAttachmentCheckboxValue);

  const handleChange = (evt: CheckboxChangeEvent) => {
    dispatch(attachmentsUpdated(evt.target.checked));
    dispatch(fetchTasksAction());
  };

  return (
    <FilterWrapper className={filterStyles.checkboxGroup} header="ДРУГИЕ">
      <Checkbox onChange={handleChange} checked={checkboxValue}>
        С вложениями
      </Checkbox>
    </FilterWrapper>
  );
};

export default AttachmentCheckbox;
