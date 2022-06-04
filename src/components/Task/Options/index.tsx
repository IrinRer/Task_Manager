import React from 'react';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Popover } from 'antd';
import { getTask } from 'store/editTask/selectors';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

const Options: React.FC = () => {
  const task = useAppSelector(getTask);

  return (
    <Popover
      overlayClassName="popover options"
      content={<OptionsMenu task={task} />}
      trigger="click"
    >
      <MoreIcon className={styles.optionIcon} />
    </Popover>
  );
};

export default Options;
