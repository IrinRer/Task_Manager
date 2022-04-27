import React, { useMemo } from 'react';

import { Select } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons';
import { tagsUpdated } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { DEBOUNCE_TIMEOUT } from 'constants/common';
import { debounce } from 'lodash';
import { selectPopulatedTags } from 'store/common/tags/selectors';
import { fetchTagsAction } from 'store/common/tags/thunk';
import { fetchTasksAction } from 'store/tasks/thunk';
import { IPopulatedTag, ITag } from 'store/common/tags/types';
import {
  selectFilterTags,
  selectFilterTagsNames,
} from 'store/filters/selectors';
import FilterWrapper from '../../../Common/FilterWrapper';
import Tag from './Tag';
import styles from './index.module.scss';

const TagsInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const allTags: Array<IPopulatedTag> = useAppSelector(selectPopulatedTags);
  const selectedTags: Array<ITag> = useAppSelector(selectFilterTags);
  const selectedTagsNames: Array<string> = useAppSelector(
    selectFilterTagsNames,
  );

  const handleChange = (_, query: Array<IPopulatedTag>) => {
    dispatch(tagsUpdated(query));
    dispatch(fetchTasksAction());
  };

  const debouncedHandleSearch = useMemo(() => {
    function handleSearch(query: string) {
      dispatch(fetchTagsAction(query));
    }

    return debounce(handleSearch, DEBOUNCE_TIMEOUT);
  }, [dispatch]);

  return (
    <FilterWrapper header="МЕТКА">
      <Select
        mode="tags"
        className={styles.tagSelect}
        suffixIcon={<PlusSquareTwoTone />}
        bordered={false}
        options={allTags}
        value={selectedTagsNames}
        placeholder="Поиск..."
        notFoundContent="Ничего не найдено"
        showArrow
        onChange={handleChange}
        onSearch={debouncedHandleSearch}
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
