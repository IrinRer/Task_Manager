import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
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

  const [newTitle, setNewTitle] = useState<string | undefined>(
    useAppSelector(getTitle),
  );

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
  };

  const onBlur = () => {
    if (taskId && newTitle) {
      dispatch(setTaskTitle({ task_id: taskId, title: newTitle }));
      setNewTitle(title);
    }
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
          value={newTitle || ''}
          status={!newTitle ? 'error' : ''}
        />
        <EditOutlined />
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Title;
