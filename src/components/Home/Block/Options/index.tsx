import React, { useState } from 'react';
import moreIcon from 'assets/icons/more.svg';
import { Popover } from 'antd';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

const Options: React.FC = () => {
  const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisibleOptions(newVisible);
  };

  return (
    <div className={styles.wrapper}>
      <Popover
        overlayClassName="popover options"
        content={
          <OptionsMenu
            isVisibleDelete={isVisibleDelete}
            setIsVisibleDelete={setIsVisibleDelete}
            setVisibleOptions={setVisibleOptions}
          />
        }
        trigger="click"
        visible={visibleOptions && !isVisibleDelete}
        onVisibleChange={handleVisibleChange}
      >
        <span>
          <img src={moreIcon} alt="moreIcon" />
        </span>
      </Popover>
    </div>
  );
};

export default Options;
