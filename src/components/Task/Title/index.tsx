import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { setTitle } from 'store/task/slice';
import { getTaskId, getTitle } from 'store/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { setTaskTitle } from 'store/task/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const Title: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(getTitle);
  const taskId = useAppSelector(getTaskId);

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const onBlur = () => {
    dispatch(setTaskTitle({ task_id: taskId, title }));
  };

  return (
    <>
      <div className={styles.wrapname}>
        <TextArea
          autoSize
          maxLength={150}
          placeholder="Введите название"
          className={styles.name}
          onChange={changeTitle}
          onBlur={onBlur}
          value={title}
        />
        <EditOutlined />
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Title;
