import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import { setTitle } from 'store/task/slice';
import { getTaskId, getTitle } from 'store/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { setTaskTitle } from 'store/task/thunk';
import styles from './index.module.scss';

const Title: React.FC = () => {
  const dispatch = useDispatch();
  const title = useAppSelector(getTitle);
  const taskId = useAppSelector(getTaskId);

  const changeTitle = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const onBlur = () => {
    dispatch(setTaskTitle({ task_id: taskId, title }));
  };

  return (
    <>
      <TextArea
        autoSize
        maxLength={150}
        placeholder="Введите название"
        className={styles.name}
        onChange={changeTitle}
        onBlur={onBlur}
        value={title}
      />
      <div className={styles.border} />
    </>
  );
};

export default Title;
