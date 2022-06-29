import CustomTag from 'components/Common/CustomTag';
import { MAX_TAGS_TO_SHOW } from 'constants/common';
import React from 'react';
import { IResponseTags } from 'store/common/task/types';
import styles from './index.module.scss';

interface IProps {
  tags: IResponseTags[];
}

const RenderTags: React.FC<IProps> = ({ tags }) => {
  const renderedTags =
    tags.length > MAX_TAGS_TO_SHOW
      ? tags.slice(0, MAX_TAGS_TO_SHOW)
      : [...tags];
  return (
    <>
      {renderedTags.map((tag) => {
        return (
          <CustomTag
            key={tag.task_to_tag_id}
            title={tag.task_tag.name}
            color={tag.task_tag.color}
            closable={false}
          />
        );
      })}
      {tags.length > MAX_TAGS_TO_SHOW && (
        <span className={styles.plus}>+ {tags.length - MAX_TAGS_TO_SHOW}</span>
      )}
    </>
  );
};

export default RenderTags;
