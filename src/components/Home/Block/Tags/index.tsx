import CustomTag from 'components/Common/CustomTag';
import { TTag } from 'constants/types/common';
import React from 'react';
import styles from './index.module.scss';

interface IProps {
  tags: TTag[];
}

const Tags: React.FC<IProps> = ({ tags }) => {
  const renderTags = (tags: TTag[]): React.ReactElement => {
    const renderedTags = tags.length > 3 ? tags.slice(0, 3) : [...tags];
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
        {tags.length > 3 && (
          <span className={styles.plus}>+ {tags.length - 3}</span>
        )}
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      {tags?.length ? renderTags(tags) : null}
    </div>
  );
};

export default Tags;
