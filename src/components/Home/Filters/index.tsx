import React from 'react';

import styles from './index.module.scss';
import SearchInput from './SearchInput';
import ParticipantsSelect from './ParticipantsSelect';
import StatusCheckboxGroup from './StatusCheckboxGroup';
import TagsInput from './TagsSelect';
import AttachmentCheckbox from './AttachmentCheckbox';
import ProgressRadioGroup from './ProgressRadioGroup';
import PriorityCheckboxGroup from './PriorityCheckboxGroup';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import CloseButton from './CloseButton';

const Filters: React.FC = () => {
  return (
    <div className={styles.container}>
      <SearchInput />
      <ParticipantsSelect />
      <StatusCheckboxGroup />
      <TagsInput />
      <AttachmentCheckbox />
      <ProgressRadioGroup />
      <PriorityCheckboxGroup />
      <SubmitButton />
      <ResetButton />
      <CloseButton />
    </div>
  );
};

export default Filters;
