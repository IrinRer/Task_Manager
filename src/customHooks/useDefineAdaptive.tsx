import React, { ReactElement } from 'react';
import CommonComponentChildren from 'components/Task/Main/History/Common';
import CommonComponentNoChildren from 'components/Task/Main/History/Common/CommonComponent';
import { useWindowSize } from './useWindowSize';

export const useDefineAdaptive = (
  width: string,
  children: ReactElement | null,
) => {
  const size = useWindowSize();
  const sizeValue = size.width || 0;

  const widthApAdaptive =
    sizeValue >= 1500
      ? size.width
      : sizeValue >= 1400 && sizeValue < 1500 && Number(width) > 500
      ? size.width
      : width;

  return (widthApAdaptive || 0) <= 899 ? (
    <CommonComponentChildren>{children}</CommonComponentChildren>
  ) : (
    <>
      <CommonComponentNoChildren />
      {children}
    </>
  );
};
