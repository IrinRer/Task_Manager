import React from 'react';
import arrUpIcon from 'assets/icons/arrUp.svg';
import arrDownIcon from 'assets/icons/arrDown.svg';
import styles from './index.module.scss';

interface IProps {
  pageSize: number;
  handler(pageSize: number): void;
}

const PaginationLabel: React.FC<IProps> = ({ pageSize, handler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageSize}>{pageSize}</div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.increase}
          onClick={() => handler(pageSize + 1)}
        >
          <img src={arrUpIcon} alt="increase" />
        </button>
        <button
          type="button"
          className={styles.decrease}
          onClick={() => handler(pageSize - 1)}
        >
          <img src={arrDownIcon} alt="decrease" />
        </button>
      </div>
    </div>
  );
};

export default PaginationLabel;
