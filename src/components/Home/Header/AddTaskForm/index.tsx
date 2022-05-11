import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCreatedStatusID } from 'store/common/statuses/selectors';
import { createTaskAction } from 'store/tasks/thunk';
import checkIcon from 'assets/icons/check1.svg';
import styles from './index.module.scss';

interface IProps {
  onClose(): void;
}

const AddTaskForm: React.FC<IProps> = ({ onClose }) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const statusId = useAppSelector(getCreatedStatusID);

  // заготовка под будущий функционал создания задачи. будет диспатч
  const onAdd = (taskTitle) => {
    dispatch(createTaskAction({ title: taskTitle, task_status_id: statusId }));
  };

  const handleSave = (): void => {
    if (text.trim().length) {
      onAdd(text);
      onClose();
    } else {
      notification.error({ message: 'Введите название задачи' });
    }
  };

  const handleCancel = (): void => {
    setText('');
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.input}
        value={text}
        prefix={<img src={checkIcon} alt="checkicon" />}
        maxLength={150}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className={styles.save} onClick={handleSave}>
        Сохранить
      </Button>
      <Button className={styles.cancel} onClick={handleCancel}>
        Отменить
      </Button>
    </div>
  );
};

export default AddTaskForm;
