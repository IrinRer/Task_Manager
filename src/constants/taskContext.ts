import { createContext } from 'react';
import { TTask } from './types/common';

export const TaskContext = createContext<TTask | null>(null);
