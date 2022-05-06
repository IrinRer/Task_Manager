import React, {MutableRefObject, Ref, useRef, useState } from 'react';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import {
  getEditTitleLoading,
  getTaskId,
  getTitle,
} from 'store/editTask/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { setTaskTitle } from 'store/editTask/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { EditOutlined } from '@ant-design/icons';

import Spinner from 'components/Common/Spinner';
import classnames from 'classnames';
import { Button } from 'antd';
import styles from './index.module.scss';

const Title: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(getTitle);
  const taskId = useAppSelector(getTaskId);
  const editLoading = useAppSelector(getEditTitleLoading);

  const inputRef: Ref<TextAreaRef> | undefined  /*: MutableRefObject<typeof TextArea | null> */ = useRef(null);
  const [newTitle, setNewTitle] = useState<string | undefined>(title);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const changeReadonly = () => {
    setIsReadonly(!isReadonly);
    inputRef.current!.focus({
      cursor: 'end',
    });
  };

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
  };

  const onBlur = () => {
    if (taskId && newTitle && !isReadonly) {
      dispatch(setTaskTitle({ task_id: taskId, title: newTitle }));
    }
    setIsReadonly(true);
  };

  if (editLoading) {
    return (
      <>
        <div className={styles.wrapname}>
          <Spinner margin="0 auto" size="default" />
        </div>
        <div className={styles.border} />
      </>
    );
  }

  

  return (
    <>
      <div className={styles.wrapname}>
        <TextArea
          ref={inputRef}
          autoSize
          maxLength={150}
          placeholder="Введите название"
          className={classnames(styles.name, {
            [styles.readonly]: isReadonly,
            [styles.error]: !newTitle,
          })}
          onChange={changeTitle}
          onBlur={onBlur}
          value={newTitle || ''}
          readOnly={isReadonly}
        />
        {isReadonly ? <EditOutlined onClick={changeReadonly} /> : null}
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Title;
