import React from 'react';
import { HistoryContext, IHistory, useHistoryValue } from '../context';

interface IProps extends IHistory {
  children: React.ReactNode;
}

const ContextWrapperHistory: React.FC<IProps> = ({ item, text, children }) => {
  return (
    <HistoryContext.Provider value={useHistoryValue(item, text)}>
      {children}
    </HistoryContext.Provider>
  );
};

export default ContextWrapperHistory;
