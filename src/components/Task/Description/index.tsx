import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import { setDescription } from 'store/task/slice';
import { Button } from 'antd';
import { getDescription, getTaskId } from 'store/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { setTaskDescription } from 'store/task/thunk';
import styles from './index.module.scss';

const Description: React.FC = () => {
  const dispatch = useDispatch();
  const description = useAppSelector(getDescription);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  const taskId = useAppSelector(getTaskId);

  const [newDesc, setNewDesc] = useState<string | undefined>(
    useAppSelector(getDescription),
  );

  const changeDescription = (e) => {
    setNewDesc(e.target.value);
  };

  const handleSave = () => {
    dispatch(setDescription(newDesc || ''));
    dispatch(
      setTaskDescription({ task_id: taskId, description: newDesc || '' }),
    );
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
      ) : (
        ''
      )}
      <TextArea
        autoSize
        maxLength={500}
        placeholder="Введите описание, чтобы сделать задачу понятнее"
        className={
          isReadonly ? `${styles.desc} ${styles.readonly}` : styles.desc
        }
        onChange={changeDescription}
        value={newDesc || description}
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
      ) : (
        ''
      )}
    </div>
  );
};

export default Description;
