import React from 'react';
import { HISTORY_ADAPTIVE } from 'constants/common';
import classNames from 'classnames';
import DateHistory from '../../DateHistory';
import User from '../../User';
import styles from '../../index.module.scss';

interface IProps {
  sizeValue: number;
}

const CommonComponentNoChildren: React.FC<IProps> = ({ sizeValue }) => {
  const className = classNames(styles.historyElemRow, {
    [styles.historyElem]: sizeValue <= HISTORY_ADAPTIVE,
  });

  return (
    <div className={className}>
      <User />
      <DateHistory />
    </div>
  );
};

export default CommonComponentNoChildren;
