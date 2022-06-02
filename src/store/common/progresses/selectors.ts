import { RootState } from 'store/index';

export const selectProgresses = (state: RootState) =>
  state.common.progresses.progresses;
