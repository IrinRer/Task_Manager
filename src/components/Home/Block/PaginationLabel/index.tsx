import React from 'react';
import paginationArrowUp from 'assets/icons/paginationArrowUp.svg';
import paginationArrowDown from 'assets/icons/paginationArrowDown.svg';
import { MAX_TASKS_ON_PAGE } from 'constants/rules';
import PageSize from './PageSize';
import styles from './index.module.scss';

interface IProps {
  pageSize: number;
  handler(pageSize: number): void;
}

const PaginationLabel: React.FC<IProps> = ({ pageSize, handler }) => {
  const handleIncrease = (): void => {
    if (pageSize < MAX_TASKS_ON_PAGE - 1) handler(pageSize + 1);
  };
  const handleDecrease = (): void => {
    if (pageSize > 1) {
      handler(pageSize - 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <PageSize pageSize={pageSize} handleChange={handler} />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.increase}
          onClick={handleIncrease}
        >
          <img src={paginationArrowUp} alt="increase" />
        </button>
        <button
          type="button"
          className={styles.decrease}
          onClick={handleDecrease}
        >
          <img src={paginationArrowDown} alt="decrease" />
        </button>
      </div>
    </div>
  );
};

export default PaginationLabel;
