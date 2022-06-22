import { Button } from 'antd';
// import MessageModal from 'components/Common/MessageModal';
// import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
// import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useState } from 'react';
// import { getShowTaskCreatedMessage } from 'store/createTask/selectors';
// import { setShowTaskCreatedMessage } from 'store/createTask/slice';
import AddTaskForm from '../AddTaskForm';
import styles from './index.module.scss';

const AddNewTask = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const closeForm = (): void => {
    setShowForm(false);
  };

  /*   const closeMessage = () => {
    dispatch(setShowTaskCreatedMessage(false));
  }; */

  if (showForm) {
    return <AddTaskForm onClose={closeForm} />;
  }

  return (
    <>
      <Button
        className={styles.new}
        type="link"
        onClick={() => setShowForm(true)}
      >
        Создать новую задачу
      </Button>

      {/*       {showMessage && (
        <MessageModal
          isVisible={showMessage}
          setIsVisible={closeMessage}
          selfClosing
        >
          Задача создана
        </MessageModal>
      )} */}
    </>
  );
};

export default AddNewTask;
