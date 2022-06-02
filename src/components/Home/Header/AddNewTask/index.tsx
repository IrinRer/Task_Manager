import { Button } from 'antd';
import { RIGHTS_NAMES } from 'constants/rights';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getRights } from 'helpers/rights';
import React, { useState } from 'react';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import AddTaskForm from '../AddTaskForm';
import styles from './index.module.scss';

const AddNewTask = () => {
  const [showForm, setShowForm] = useState(false);
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.createTask);

  const closeForm = (): void => {
    setShowForm(false);
  };

  if (showForm) {
    return <AddTaskForm onClose={closeForm} />;
  }

  return isRights ? (
    <Button
      className={styles.new}
      type="link"
      onClick={() => setShowForm(true)}
    >
      Создать новую задачу
    </Button>
  ) : null;
};

export default AddNewTask;
