import { createContext } from 'react';
import { IResponseTask } from 'store/common/task/types';

export const TaskContext = createContext<IResponseTask | null>(null);
