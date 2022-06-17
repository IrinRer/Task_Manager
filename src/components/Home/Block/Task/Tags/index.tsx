import CustomTag from 'components/Common/CustomTag';
import { TTag } from 'constants/types/common';
import React, { useContext } from 'react';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';

const Tags: React.FC = () => {
  const task = useContext(TaskContext);
  const tags = task?.tags;

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
