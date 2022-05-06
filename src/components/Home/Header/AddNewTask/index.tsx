import { Button } from 'antd';
import React, { useState } from 'react';
import AddTaskForm from '../AddTaskForm';
import styles from './index.module.scss';

const AddNewTask = () => {
  const [showForm, setShowForm] = useState(false);

  const closeForm = (): void => {
    setShowForm(false);
  };

  if (showForm) {
    return <AddTaskForm onClose={closeForm} />;
  }

  return (
    <Button
      className={styles.new}
      type="link"
      onClick={() => setShowForm(true)}
    >
      Создать новую задачу
    </Button>
  );
};

export default AddNewTask;
