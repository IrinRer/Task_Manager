import React from 'react';
import classnames from 'classnames';
import { ReactComponent as DragIcon } from 'assets/icons/drag.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

interface IProps {
  isHover: boolean;
  onMouseDown: () => void;
}

const DragButton: React.FC<IProps> = ({ isHover, onMouseDown }) => {
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editChecklistItem);

  const className = classnames(styles.dragIcon, {
    [styles.dragIconHover]: isHover,
  });

  if (!isRights) {
    return null;
  }

  return <DragIcon className={className} onMouseDown={onMouseDown} />;
};

export default DragButton;
