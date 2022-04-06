import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createDescription, createTitle } from 'store/task/slice';
import { Button } from 'antd';
import { getDataCreate, getDescription } from 'store/task/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import styles from './index.module.scss';
import History from '../History';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const description = useAppSelector(getDescription);
  const data = useAppSelector(getDataCreate);
  const idTask = '2e5f852b-a603-440a-8c4f-1f2f20ddc90f';

  const changeTitle = (e) => {
    dispatch(createTitle(e.target.value));
  };

  const handleSave = (e) => {
    dispatch(
      createDescription(
        e.target.closest('div').querySelector('textarea').value,
      ),
    );
  };

  const handleCancel = (e) => {
    e.target.closest('div').querySelector('textarea').value = description;
  };

  return (
    <div className={styles.taskMain}>
      <TextArea
        autoSize
        placeholder="Введите название"
        className={styles.name}
        onChange={changeTitle}
        value={data.title}
      />
      <div className={styles.border} />

      <div className={styles.section}>
        <AlignLeftOutlined />
        <div className={styles.wrapper}>
          Описание
          <TextArea
            autoSize
            placeholder="Введите описание, чтобы сделать задачу понятнее"
            className={styles.desc}
          />
          <Button className={styles.save} onClick={handleSave}>
            Сохранить
          </Button>
          <Button className={styles.cancel} onClick={handleCancel}>
            Отменить
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <CommentOutlined />
        <div className={styles.wrapper}>
          Комментарии
          <TextArea
            autoSize
            placeholder="Оставьте комментарий"
            className={styles.comm}
          />
        </div>
      </div>

      <div className={styles.section}>
        <ContainerOutlined />
        <div className={styles.wrapper}>
          Действия
          <History />
        </div>
      </div>
    </div>
  );
};

export default Main;
