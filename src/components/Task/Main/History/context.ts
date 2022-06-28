import { IHistoryItem } from 'store/history/types';
import { createContext, useMemo } from 'react';

export interface IHistory {
  item?: IHistoryItem;
  text: string;
}

export const HistoryContext = createContext<IHistory>({
  text: 'задача',
});

export const useHistoryValue = (item: any, text: string) => {
  return useMemo(() => ({ item, text }), [item, text]);
};
