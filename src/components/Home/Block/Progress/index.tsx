import React from 'react';
import { TProgress } from 'constants/types/common';
import checkIcon from 'assets/icons/check.svg';
import FlexWrapper from 'components/Common/FlexWrapper';
import styles from './index.module.scss';

interface IProps {
  progress: TProgress;
}

const Progress: React.FC<IProps> = ({ progress }) => {
  return (
    <FlexWrapper wrapperClassName={styles.wrapper}>
      {progress ? (
        <>
          <img src={checkIcon} alt="checkIcon" /> {progress.completed}/
          {progress.total}
        </>
      ) : null}
    </FlexWrapper>
  );
};

export default Progress;
