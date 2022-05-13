import React from 'react';
import { Checkbox, Popover } from 'antd';
import classnames from 'classnames';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import filterStyles from 'components/Home/Filters/index.module.scss';
import { ICheckListItem } from 'store/common/task/types';
import ChecklistItemPopoverMenu from './ChecklistItemPopoverMenu';
import styles from './index.module.scss';

interface IProps {
  checkListItem: ICheckListItem;
}

const CheckListItem: React.FC<IProps> = ({ checkListItem }) => {
  const { check_list_item_id, message, complete } = checkListItem;

  const checkBoxClassName = classnames(
    filterStyles.checkboxGroup,
    styles.checkbox,
  );

  const checkBoxTextClassName = classnames(styles.checkBoxText, {
    [styles.checkBoxTextCompleted]: complete,
  });

  return (
    <div className={styles.checkListItem}>
      <Checkbox checked={complete} className={checkBoxClassName} />
      <p className={checkBoxTextClassName}>{message}</p>
      <Popover
        trigger="click"
        content={ChecklistItemPopoverMenu}
        overlayClassName={styles.popoverMenu}
        placement="bottomRight"
      >
        <MoreIcon className={styles.moreButton} />
      </Popover>
    </div>
  );
};

export default CheckListItem;
