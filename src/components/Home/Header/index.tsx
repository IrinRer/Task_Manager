import React from 'react';
import classnames from 'classnames';
import { Avatar, Button, Col, Row } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getOnlyMyTasksFlag } from 'store/tasks/selectors';
import { showOnlyMyTasks, showAllTasks } from 'store/tasks/slice';
import clockIcon from 'assets/icons/clock.svg';
import personIcon from 'assets/icons/person.svg';
import AddNewTask from './AddNewTask';
import styles from './index.module.scss';

const tasksButtonClass = (flag: boolean): string => {
  return flag ? styles.inactive : styles.active;
};

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const onlyMyTasks = useAppSelector(getOnlyMyTasksFlag);

  const allTasksButtonStyle = classnames(tasksButtonClass(onlyMyTasks));
  const onlyMyTasksButtonStyle = classnames(tasksButtonClass(!onlyMyTasks));

  const handleAllTasksClick = () => dispatch(showAllTasks());

  const handleOnlyMyTasksClick = () => dispatch(showOnlyMyTasks());

  return (
    <>
      <Row className={styles.wrapper}>
        <h1>Задачи</h1>
        <h1>
          {/* аватар будет от реального пользователя */}
          <Avatar src="https://vraki.net/sites/default/files/inline/images/30_55.jpg" />
        </h1>
      </Row>

      {/* Кнопки все задачи - мои задачи */}
      <Row className={styles.wrapper} justify="space-between">
        <div className={styles.buttons}>
          <Button
            type={onlyMyTasks ? 'text' : 'default'}
            className={allTasksButtonStyle}
            onClick={handleAllTasksClick}
          >
            <img src={clockIcon} alt="clockIcon" />
            <span>Все</span>
          </Button>
          <Button
            type={onlyMyTasks ? 'default' : 'text'}
            className={onlyMyTasksButtonStyle}
            onClick={handleOnlyMyTasksClick}
          >
            <img src={personIcon} alt="personIcon" />
            <span>Назначенные мне</span>
          </Button>
        </div>

        {/* Кнопка создания новой задачи */}
        <Col className={styles.newtask} span={4}>
          <AddNewTask />
        </Col>
      </Row>
    </>
  );
};

export default Header;
