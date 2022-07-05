import React, { ReactElement } from 'react';
import CommonComponentChildren from 'components/Task/Main/History/Common';
import CommonComponentNoChildren from 'components/Task/Main/History/Common/CommonComponent';
import { useWindowSize } from './useWindowSize';

export const useDefineAdaptive = (
  width: number,
  children: ReactElement | null,
) => {
  const size = useWindowSize();
  const sizeValue = size.width || 0;

  return (sizeValue || 0) <= 999 ? (
    <CommonComponentChildren>{children}</CommonComponentChildren>
  ) : (
    <>
      <CommonComponentNoChildren />
      {children}
    </>
  );
};
