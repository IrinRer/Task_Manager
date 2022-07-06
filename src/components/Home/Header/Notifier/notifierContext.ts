import { createContext } from 'react';
import { INotification } from 'store/notifications/types';

export const NotifierContext = createContext<INotification | null>(null);
