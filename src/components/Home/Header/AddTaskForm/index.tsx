import { Button, Input } from 'antd';
import React, { useState } from 'react';
import checkIcon from 'assets/icons/check1.svg';
import styles from './index.module.scss';

interface IProps {
  onClose(): void;
}

const AddTaskForm: React.FC<IProps> = ({ onClose }) => {
  const [text, setText] = useState('');

  // заготовка под будущий функционал создания задачи. будет диспатч
  const onAdd = (taskTitle) => {};

  const handleSave = (): void => {
    onAdd(text);
    onClose();
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
