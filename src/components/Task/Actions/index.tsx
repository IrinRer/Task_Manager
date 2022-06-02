import React from 'react';

import { Popover } from 'antd';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsTaskEditable } from 'store/editTask/selectors';
import ActionsPopoverMenu from './ActionsPopoverMenu';
import checkListItemStyle from '../Checklist/Items/Item/index.module.scss';
import styles from './index.module.scss';

const Actions = () => {
  const isTaskEditable = useAppSelector(getIsTaskEditable);

  if (!isTaskEditable) {
    return null;
  }

  return (
    <Popover
      trigger="click"
      content={ActionsPopoverMenu}
      overlayClassName={checkListItemStyle.popoverMenu}
      placement="bottomRight"
    >
      <PlusIcon className={styles.actionIcon} />
    </Popover>
  );
};

export default Actions;
