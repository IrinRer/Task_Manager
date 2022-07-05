import React, { ReactElement } from 'react';
import CommonComponentChildren from 'components/Task/Main/History/Common';
import { HISTORY_ADAPTIVE } from 'constants/common';
import CommonComponentNoChildren from 'components/Task/Main/History/Common/CommonComponent';
import { useWindowSize } from './useWindowSize';
import styles from '../components/Task/Main/History/index.module.scss';

export const useDefineAdaptive = (
  children: ReactElement | null,
) => {
  const size = useWindowSize();
  const sizeValue = size.width || 0;

  return (sizeValue || 0) <= HISTORY_ADAPTIVE ? (
    <CommonComponentChildren>
      {children}
    </CommonComponentChildren>
  ) : (
    <div className={styles.historyElem}>
      <CommonComponentNoChildren sizeValue={sizeValue} />
      {children}
    </div>
  );
};
