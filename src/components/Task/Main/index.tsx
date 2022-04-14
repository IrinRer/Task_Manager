import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createDescription, createTitle } from 'store/task/slice';
import { Button } from 'antd';
import {
  getDataCreate,
  getDescription,
  getTask,
  getTaskId,
  getTitle,
} from 'store/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const description = useAppSelector(getDescription);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  // const data = useAppSelector(getDataCreate);
  // const fetchdata = useAppSelector(getTask);
  const data = {
    title: useAppSelector(getTitle),
    description: useAppSelector(getDescription),
  };
  const [newDesc, setNewDesc] = useState<string>(data.description);
  // const taskId = useAppSelector(getTaskId);

  const changeTitle = (e) => {
    dispatch(createTitle(e.target.value));
  };

  const changeDescription = (e) => {
    setNewDesc(e.target.value);
  };

  const handleSave = (e) => {
    dispatch(
      createDescription(
        e.target.closest('div').querySelector('textarea').value,
      ),
    );
    setIsReadonly(true);
  };

  const handleCancel = (e) => {
    e.target.closest('div').querySelector('textarea').value = data.description;
    setNewDesc(data.description);
    setIsReadonly(true);
  };

  const handleChange = () => {
    setIsReadonly(!isReadonly);
  };

  return (
    <div className={styles.taskMain}>
      <TextArea
        autoSize
        maxLength={150}
        placeholder="Введите название"
        className={styles.name}
        onChange={changeTitle}
        value={data.title}
      />
      <div className={styles.border} />

      <InputWrapper labelText="Описание" icon={<AlignLeftOutlined />}>
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
          value={newDesc}
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
      </InputWrapper>

      <InputWrapper labelText="Комментарии" icon={<CommentOutlined />}>
        <TextArea
          autoSize
          placeholder="Оставьте комментарий"
          className={styles.comm}
        />
      </InputWrapper>

      <InputWrapper labelText="Действия" icon={<ContainerOutlined />}>
        <History />
      </InputWrapper>
    </div>
  );
};

export default Main;
