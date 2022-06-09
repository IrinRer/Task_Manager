import React from 'react';
import classnames from 'classnames';
import { ReactComponent as DragIcon } from 'assets/icons/drag.svg';
import styles from './index.module.scss';

interface IProps {
  isHover: boolean;
  onMouseDown: () => void;
}

const DragButton: React.FC<IProps> = ({ isHover, onMouseDown }) => {
  const className = classnames(styles.dragIcon, {
    [styles.dragIconHover]: isHover,
  });

  return <DragIcon className={className} onMouseDown={onMouseDown} />;
};

export default DragButton;
