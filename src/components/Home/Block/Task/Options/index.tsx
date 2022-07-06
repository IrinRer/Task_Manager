import React, { useState } from 'react';
import moreIcon from 'assets/icons/more.svg';
import { Popover } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getModalDeleteTaskVisible } from 'store/editTask/selectors';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

const Options: React.FC = () => {
  const isVisibleTaskDelete = useAppSelector(getModalDeleteTaskVisible);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisibleOptions(newVisible);
  };

  return (
    <div className={styles.wrapper}>
      <Popover
        overlayClassName="popover options"
        content={<OptionsMenu setVisibleOptions={setVisibleOptions} />}
        trigger="click"
        visible={visibleOptions && !isVisibleTaskDelete}
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
