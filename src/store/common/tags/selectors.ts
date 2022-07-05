import { RootState } from 'store/index';
import { createSelector } from '@reduxjs/toolkit';
import { selectUniqueObjectsFromArray } from 'helpers/selectUniqueObjectsFromArray';
import { IPopulatedTag, ITag } from './types';

const selectTags = (state: RootState): Array<ITag> => state.common.tags.tags;

const selectUniqueTags = createSelector(selectTags, (tags): Array<ITag> => {
  return selectUniqueObjectsFromArray(tags, 'task_tag_id');
});

export const selectPopulatedTags = createSelector(
  selectUniqueTags,
  (tags): Array<IPopulatedTag> =>
    tags.map((tag) => {
      return { ...tag, value: tag.name, key: tag.task_tag_id };
    }),
);

