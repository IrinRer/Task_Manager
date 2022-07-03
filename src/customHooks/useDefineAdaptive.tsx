import React, { ReactElement } from 'react';
import CommonComponentChildren from 'components/Task/Main/History/Common';
import CommonComponentNoChildren from 'components/Task/Main/History/Common/CommonComponent';
import { ADAPTIVE_HISTORY_WIDTH } from 'constants/history/common';
import { useDefineWidth } from './useDefineWidth';

export const useDefineAdaptive = (children: ReactElement | null) => {
  const width = useDefineWidth();

  return width > ADAPTIVE_HISTORY_WIDTH ? (
    <>
      <CommonComponentNoChildren />
      {children}
    </>
  ) : (
    <CommonComponentChildren>{children}</CommonComponentChildren>
  );
};
