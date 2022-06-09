import React from 'react';
import classnames from 'classnames';
import { ReactComponent as DragIcon } from 'assets/icons/drag.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsTaskEditable } from 'store/editTask/selectors';
import styles from './index.module.scss';

interface IProps {
  isHover: boolean;
  onMouseDown: () => void;
}

const DragButton: React.FC<IProps> = ({ isHover, onMouseDown }) => {
  const isTaskEditable = useAppSelector(getIsTaskEditable);

  const className = classnames(styles.dragIcon, {
    [styles.dragIconHover]: isHover,
  });

  if (!isTaskEditable) {
    return null;
  }

  return <DragIcon className={className} onMouseDown={onMouseDown} />;
};

export default DragButton;
