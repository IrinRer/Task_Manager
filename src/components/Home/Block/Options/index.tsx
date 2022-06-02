import React from 'react';
import moreIcon from 'assets/icons/more.svg';
import { TTask } from 'constants/types/common';
import { Popover } from 'antd';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

interface IProps {
  task: TTask;
}

const Options: React.FC<IProps> = ({ task }) => {
  return (
    <div className={styles.wrapper}>
      <Popover
        overlayClassName="popover options"
        content={<OptionsMenu task={task} />}
        trigger="click"
      >
        <span>
          <img src={moreIcon} alt="moreIcon" />
        </span>
      </Popover>
    </div>
  );
};

export default Options;
