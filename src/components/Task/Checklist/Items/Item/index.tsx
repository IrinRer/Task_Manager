import React, { useState } from 'react';
import { Checkbox } from 'antd';
import classnames from 'classnames';
import filterStyles from 'components/Home/Filters/index.module.scss';
import { ICheckListItem } from 'store/common/task/types';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ICheckListChangeCompleteStatus } from 'store/editTask/types';
import { setCompleteCheckListItem } from 'store/editTask/checkLists/setCompleteCheckListItem/thunk';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import { setDraggedItemId } from 'store/editTask/checkLists/setCheckListItemPosition/slice';
import { setCheckListItemPosition } from 'store/editTask/checkLists/setCheckListItemPosition/thunk';
import ActionsMenu from './ActionsMenu';
import DragButton from './DragButton';
import styles from './index.module.scss';

interface IProps {
  checkListItem: ICheckListItem;
}

const CheckListItem: React.FC<IProps> = ({ checkListItem }) => {
  const dispatch = useAppDispatch();

  const { check_list_item_id, message, complete } = checkListItem;

  const isRights = useGetRights(RIGHTS_NAMES.editChecklistItem);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const checkListItemClassName = classnames(styles.checkListItem, {
    [styles.checkListItemDraggedOver]: isDraggedOver,
  });

  const checkBoxClassName = classnames(
    filterStyles.checkboxGroup,
    styles.checkbox,
  );

  const checkBoxTextClassName = classnames(styles.checkBoxText, {
    [styles.checkBoxTextCompleted]: complete,
  });

  const toggleCheckListItemComplete = (evt: CheckboxChangeEvent) => {
    const data: ICheckListChangeCompleteStatus = {
      check_list_item_id,
      complete: evt.target.checked,
    };

    dispatch(setCompleteCheckListItem(data));
  };

  const handleCheckListItemHover = () => {
    setIsHover(true);
  };

  const handleCheckListItemHoverLeave = () => {
    setIsHover(false);
  };

  const handleDragStart = () => {
    dispatch(setDraggedItemId(checkListItem.check_list_item_id));
  };

  const handleDragOver = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsDraggedOver(true);
  };

  const handleOnDrop = () => {
    dispatch(setCheckListItemPosition(checkListItem.check_list_item_id));
    setIsDraggedOver(false);
  };

  function handleDragLeave() {
    setIsDraggedOver(false);
  }

  const handleDragEnd = () => {
    setIsDraggable(false);
  };

  const handleDragIconMouseDown = () => {
    setIsDraggable(true);
  };

  return (
    <div
      className={checkListItemClassName}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleOnDrop}
      onMouseEnter={handleCheckListItemHover}
      onMouseLeave={handleCheckListItemHoverLeave}
    >
      <DragButton isHover={isHover} onMouseDown={handleDragIconMouseDown} />
      <Checkbox
        checked={complete}
        className={checkBoxClassName}
        onChange={toggleCheckListItemComplete}
        disabled={!isRights}
      />
      <p className={checkBoxTextClassName}>{message}</p>
      <ActionsMenu check_list_item_id={check_list_item_id} isHover={isHover} />
    </div>
  );
};

export default CheckListItem;
