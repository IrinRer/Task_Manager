import { RootState } from 'store/index';
import { createSelector } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { IPopulatedTag, ITag } from './types';

const selectTags = (state: RootState): Array<ITag> => state.common.tags.tags;

export const selectPopulatedTags = createSelector(
  selectTags,
  (tags): Array<IPopulatedTag> =>
    tags.map((tag) => {
      return { ...tag, value: tag.name, key: lodash.uniqueId() };
    }),
);
