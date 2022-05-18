import React from 'react';
import paginationArrowUp from 'assets/icons/paginationArrowUp.svg';
import paginationArrowDown from 'assets/icons/paginationArrowDown.svg';
import PageSize from './PageSize';
import styles from './index.module.scss';

interface IProps {
  pageSize: number;
  handler(pageSize: number): void;
}

const PaginationLabel: React.FC<IProps> = ({ pageSize, handler }) => {
  return (
    <div className={styles.wrapper}>
      <PageSize pageSize={pageSize} handleChange={handler} />
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.increase}
          onClick={() => handler(pageSize + 1)}
        >
          <img src={paginationArrowUp} alt="increase" />
        </button>
        <button
          type="button"
          className={styles.decrease}
          onClick={() => handler(pageSize - 1)}
        >
          <img src={paginationArrowDown} alt="decrease" />
        </button>
      </div>
    </div>
  );
};

export default PaginationLabel;
