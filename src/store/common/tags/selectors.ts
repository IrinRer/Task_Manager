import { RootState } from 'store/index';
import { createSelector } from '@reduxjs/toolkit';
import { IPopulatedTag, ITag } from './types';

const selectTags = (state: RootState): Array<ITag> => state.common.tags.tags;

const selectUniqueTags = createSelector(selectTags, (tags): Array<ITag> => {
  const uniqueTagsIds: Array<string> = [];
  const uniqueTags: Array<ITag> = [];

  tags.forEach((tag) => {
    if (!uniqueTagsIds.includes(tag.task_tag_id)) {
      uniqueTagsIds.push(tag.task_tag_id);
      uniqueTags.push(tag);
    }
  });

  return uniqueTags;
});

export const selectPopulatedTags = createSelector(
  selectUniqueTags,
  (tags): Array<IPopulatedTag> =>
    tags.map((tag) => {
      return { ...tag, value: tag.name, key: tag.task_tag_id };
    }),
);
