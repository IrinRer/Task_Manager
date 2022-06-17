import React from 'react';
import moreIcon from 'assets/icons/more.svg';
import { Popover } from 'antd';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

const Options: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Popover
        overlayClassName="options"
        content={<OptionsMenu />}
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
