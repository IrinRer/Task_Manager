import React from 'react';
import classnames from 'classnames';
import { ReactComponent as DragIcon } from 'assets/icons/drag.svg';
import { RIGHTS_NAMES } from 'constants/rights';
import { useGetRights } from 'customHooks/useGetRights';
import styles from './index.module.scss';

interface IProps {
  isHover: boolean;
  onMouseDown: () => void;
}

const DragButton: React.FC<IProps> = ({ isHover, onMouseDown }) => {
  const isRights = useGetRights(RIGHTS_NAMES.editChecklistItem);

  const className = classnames(styles.dragIcon, {
    [styles.dragIconHover]: isHover,
  });

  if (!isRights) {
    return null;
  }

  return <DragIcon className={className} onMouseDown={onMouseDown} />;
};

export default DragButton;
