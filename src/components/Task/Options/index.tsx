import React, { useState } from 'react';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Popover } from 'antd';
import { getTask } from 'store/editTask/selectors';
import OptionsMenu from './OptionsMenu';
import styles from './index.module.scss';

const Options: React.FC = () => {
  const task = useAppSelector(getTask);
  const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisibleOptions(newVisible);
  };

  return (
    <Popover
      overlayClassName="popover options"
      content={
        <OptionsMenu
          task={task}
          isVisibleDelete={isVisibleDelete}
          setIsVisibleDelete={setIsVisibleDelete}
          setVisibleOptions={setVisibleOptions}
        />
      }
      trigger="click"
      visible={visibleOptions && !isVisibleDelete}
      onVisibleChange={handleVisibleChange}
    >
      <MoreIcon className={styles.optionIcon} />
    </Popover>
  );
};

export default Options;
