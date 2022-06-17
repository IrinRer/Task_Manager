import React, { useContext } from 'react';
import FlexWrapper from 'components/Common/FlexWrapper';
import attachmentIcon from 'assets/icons/attachment.svg';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';

const Attached: React.FC = () => {
  const task = useContext(TaskContext);
  const attached = task?.storage_files_meta.total;

  return attached && attached > 0 ? (
    <FlexWrapper wrapperClassName={styles.attached}>
      <img src={attachmentIcon} alt="attachmentIcon" />
      <span>{attached}</span>
    </FlexWrapper>
  ) : null;
};

export default Attached;
