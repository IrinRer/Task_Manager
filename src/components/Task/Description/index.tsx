import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import { getDescription, getTaskId } from 'store/editTask/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { setTaskDescription } from 'store/editTask/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import classnames from 'classnames';
import styles from './index.module.scss';

const Description: React.FC = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector(getDescription);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  const taskId = useAppSelector(getTaskId);

  const [newDesc, setNewDesc] = useState<string | undefined>(description);

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDesc(e.target.value);
  };

  const handleSave = () => {
    if (taskId) {
      dispatch(
        setTaskDescription({ task_id: taskId, description: newDesc || '' }),
      );
    }
    setIsReadonly(true);
  };

  const handleCancel = () => {
    setNewDesc(description);
    setIsReadonly(true);
  };

  const handleChange = () => {
    setIsReadonly(!isReadonly);
  };

  return (
    <div className={styles.description}>
      {isReadonly ? (
        <Button className={styles.change} onClick={handleChange}>
          изменить
        </Button>
      ) : null}
      <TextArea
        autoSize
        maxLength={500}
        placeholder="Введите описание, чтобы сделать задачу понятнее"
        className={classnames(styles.desc, {
          [styles.readonly]: isReadonly,
        })}
        onChange={changeDescription}
        value={newDesc || ''}
        readOnly={isReadonly}
      />
      {!isReadonly ? (
        <>
          <Button className={styles.save} onClick={handleSave}>
            Сохранить
          </Button>
          <Button className={styles.cancel} onClick={handleCancel}>
            Отменить
          </Button>{' '}
        </>
      ) : null}
    </div>
  );
};

export default Description;
