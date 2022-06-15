import React from 'react';

import { Popover } from 'antd';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import ActionsPopoverMenu from './ActionsPopoverMenu';
import checkListItemStyle from '../Checklist/Items/Item/index.module.scss';
import styles from './index.module.scss';

const Actions = () => {
  const isRights = useGetRights(RIGHTS_NAMES.addChecklist);

  if (!isRights) {
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
