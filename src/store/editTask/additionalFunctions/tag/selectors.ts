import { IPopulatedTag, ITag } from 'store/common/tags/types';
import { RootState } from 'store';
import { createSelector } from '@reduxjs/toolkit';
import { selectUniqueObjectsFromArray } from 'helpers/selectUniqueObjectsFromArray';


export const getTag = (state: RootState) =>
  state.editTask.additionalFunctions.tags.sentTag;

export const uniqueTagNameSelector = (state: RootState) =>
  state.editTask.additionalFunctions.tags.sentTag?.map(({ name }) => name);

//   const selectTags = (state: RootState): Array<ITag> => state.common.tags.tags;

// const selectUniqueTags = createSelector(selectTags, (tags): Array<ITag> => {
//   return selectUniqueObjectsFromArray(tags, 'task_tag_id');
// });

// export const selectPopulatedTags = createSelector(
//   selectUniqueTags,
//   (tags): Array<IPopulatedTag> =>
//     tags.map((tag) => {
//       return { ...tag, key: tag.task_tag_id };
//     }),
// ); 
