import React from 'react';
import moreIcon from 'assets/icons/more.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Popover } from 'antd';
import { getTask } from 'store/editTask/selectors';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

const Options: React.FC = () => {
  const task = useAppSelector(getTask);

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
