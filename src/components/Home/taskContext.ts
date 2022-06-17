import { createContext } from 'react';
import { TTask } from '../../constants/types/common';

export const TaskContext = createContext<TTask | null>(null);
