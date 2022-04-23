import React, { FC } from 'react';
import { ITag } from 'store/common/tags/types';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { tagRemoved } from 'store/filters/slice';
import { fetchTasksAction } from 'store/tasks/thunk';
import styles from './index.module.scss';

interface ITagProps {
  tag: ITag;
}

const Tag: FC<ITagProps> = ({ tag }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(tagRemoved(tag));
    dispatch(fetchTasksAction());
  };

  return (
    <div className={styles.tag}>
      <p className={styles.text}>{tag.name}</p>
      <button className={styles.button} type="button" onClick={handleClose}>
        <CloseOutlined className={styles.icon} />
      </button>
    </div>
  );
};

export default Tag;
