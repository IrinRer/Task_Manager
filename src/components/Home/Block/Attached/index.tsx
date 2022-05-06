import React from 'react';
import FlexWrapper from 'components/Common/FlexWrapper';
import attachmentIcon from 'assets/icons/attachment.svg';
import styles from './index.module.scss';

interface IProps {
  attached: number;
}

const Attached: React.FC<IProps> = ({ attached }) => {
  return attached > 0 ? (
    <FlexWrapper wrapperClassName={styles.attached}>
      <img src={attachmentIcon} alt="attachmentIcon" />
      <span>{attached}</span>
    </FlexWrapper>
  ) : null;
};

export default Attached;
