import React from 'react';
import { Checkbox, Popover } from 'antd';
import classnames from 'classnames';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import filterStyles from 'components/Home/Filters/index.module.scss';
import { ICheckListItem } from 'store/common/task/types';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ICheckListChangeCompleteStatus } from 'store/editTask/types';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { isDeleteCheckListItemLoading } from 'store/editTask/checkLists/deleteCheckListItem/selectors';
import { setCompleteCheckListItem } from 'store/editTask/checkLists/setCompleteCheckListItem/thunk';
import Spinner from 'components/Common/Spinner';
import { deleteCheckListItem } from 'store/editTask/checkLists/deleteCheckListItem/thunk';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

interface IProps {
  checkListItem: ICheckListItem;
}

const CheckListItem: React.FC<IProps> = ({ checkListItem }) => {
  const dispatch = useAppDispatch();

  const { check_list_item_id, message, complete } = checkListItem;

  const isCheckListItemLoading = useAppSelector(isDeleteCheckListItemLoading);
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editChecklistItem);

  const checkBoxClassName = classnames(
    filterStyles.checkboxGroup,
    styles.checkbox,
  );

  const checkBoxTextClassName = classnames(styles.checkBoxText, {
    [styles.checkBoxTextCompleted]: complete,
  });

  const handleDeleteCheckListItem = () => {
    dispatch(deleteCheckListItem(check_list_item_id));
  };

  const toggleCheckListItemComplete = (evt: CheckboxChangeEvent) => {
    const data: ICheckListChangeCompleteStatus = {
      check_list_item_id,
      complete: evt.target.checked,
    };
    dispatch(setCompleteCheckListItem(data));
  };

  return (
    <div className={styles.checkListItem}>
      <Checkbox
        checked={complete}
        className={checkBoxClassName}
        onChange={toggleCheckListItemComplete}
        disabled={!isRights}
      />
      <p className={checkBoxTextClassName}>{message}</p>
      <Popover
        trigger="click"
        content={
          isCheckListItemLoading ? (
            <Spinner />
          ) : (
            <button
              type="button"
              className={styles.menuOption}
              onClick={handleDeleteCheckListItem}
            >
              Удалить&nbsp;пункт
            </button>
          )
        }
        overlayClassName={styles.popoverMenu}
        placement="bottomRight"
      >
        {isRights && <MoreIcon className={styles.moreButton} />}
      </Popover>
    </div>
  );
};

export default CheckListItem;
