import React, { ReactElement } from 'react';
import CommonComponentChildren from 'components/Task/Main/History/Common';
import { ADAPATIVE_HISTORY, MAX_SIZE_WIDTH, MIN_ADAPTIVE_HISTORY, SIZE_WIDTH_LIMIT } from 'constants/common';
import CommonComponentNoChildren from 'components/Task/Main/History/Common/CommonComponent';
import { useWindowSize } from './useWindowSize';

export const useDefineAdaptive = (
  width: number,
  children: ReactElement | null,
) => {
  const size = useWindowSize();
  const sizeValue = size.width || 0;

  const widthApAdaptive =
    sizeValue >= MAX_SIZE_WIDTH
      ? size.width
      : sizeValue >= SIZE_WIDTH_LIMIT && sizeValue < MAX_SIZE_WIDTH && width > MIN_ADAPTIVE_HISTORY
      ? size.width
      : width;

  return (widthApAdaptive || 0) <= ADAPATIVE_HISTORY ? (
    <CommonComponentChildren>{children}</CommonComponentChildren>
  ) : (
    <>
      <CommonComponentNoChildren />
      {children}
    </>
  );
};
