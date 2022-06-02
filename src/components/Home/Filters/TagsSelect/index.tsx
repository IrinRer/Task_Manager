import React, { useCallback, useMemo } from 'react';

import { Select } from 'antd';
import { tagsInputValueUpdated, tagsUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { DEBOUNCE_TIMEOUT, TAGS_INPUT_MAX_LENGTH } from 'constants/common';
import { debounce } from 'lodash';
import { selectPopulatedTags } from 'store/common/tags/selectors';
import { fetchTagsAction } from 'store/common/tags/thunk';
import { fetchTasksAction } from 'store/tasks/thunk';
import { IPopulatedTag, ITag } from 'store/common/tags/types';
import {
  selectFilterTags,
  selectFilterTagsNames,
  selectTagsInputValue,
} from 'store/filters/selectors';
import FilterWrapper from 'components/Common/FilterWrapper';
import { ReactComponent as PlusIcon } from 'assets/icons/plusIcon.svg';
import Tag from './Tag';
import styles from './index.module.scss';

const TagsInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const allTags: Array<IPopulatedTag> = useAppSelector(selectPopulatedTags);
  const selectedTags: Array<ITag> = useAppSelector(selectFilterTags);
  const selectedTagsNames: Array<string> = useAppSelector(
    selectFilterTagsNames,
  );
  const searchValue = useAppSelector(selectTagsInputValue);

  const handleChange = (_, query: Array<IPopulatedTag>) => {
    dispatch(tagsUpdated(query));
    dispatch(fetchTasksAction());
    dispatch(tagsInputValueUpdated(''));
  };

  const fetchTags = useCallback(
    (query: string) => {
      dispatch(fetchTagsAction(query));
    },
    [dispatch],
  );

  const debouncedFetchTags = useMemo(
    () => debounce((query: string) => fetchTags(query), DEBOUNCE_TIMEOUT),
    [fetchTags],
  );

  const handleSearch = (query: string) => {
    const trimmedQuery = query.slice(0, TAGS_INPUT_MAX_LENGTH);

    dispatch(tagsInputValueUpdated(trimmedQuery));
    debouncedFetchTags(trimmedQuery);
  };

  return (
    <FilterWrapper header="МЕТКА">
      <Select
        mode="tags"
        className={styles.tagSelect}
        suffixIcon={<PlusIcon />}
        bordered={false}
        options={allTags}
        searchValue={searchValue}
        value={selectedTagsNames}
        placeholder="Поиск..."
        notFoundContent="Ничего не найдено"
        showArrow
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <div className={styles.tags}>
        {selectedTags.map((tag) => (
          <Tag key={tag.task_tag_id} tag={tag} />
        ))}
      </div>
    </FilterWrapper>
  );
};

export default TagsInput;
