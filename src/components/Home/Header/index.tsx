import React, { useEffect } from 'react';
import classnames from 'classnames';
import { Button, Col, Row } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getOnlyMyTasksFlag } from 'store/tasks/selectors';
import { showOnlyMyTasks, showAllTasks, resetTasks } from 'store/tasks/slice';
import clockIcon from 'assets/icons/clock.svg';
import personIcon from 'assets/icons/person.svg';
import { getCurrentUser } from 'store/users/selectors';
import UserAvatar from 'components/Common/UserAvatar';
import { ROUTES } from 'constants/routes';
import { generatePath, useNavigate } from 'react-router-dom';
import { getNewTaskId, getNewTaskSuccess } from 'store/createTask/selectors';
import { resetNewTaskSuccess } from 'store/createTask/slice';
import { CaretDownOutlined } from '@ant-design/icons';
import { filtersCleared } from 'store/filters/slice';
import { fetchTasksAction } from 'store/tasks/thunk';
import AddNewTask from './AddNewTask';
import UserMenu from './UserMenu';
import styles from './index.module.scss';

const tasksButtonClass = (flag: boolean): string => {
  return flag ? styles.inactive : styles.active;
};

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const onlyMyTasks = useAppSelector(getOnlyMyTasksFlag);
  // Получаем пользователя для отображения данных - аватара и тд
  const user = useAppSelector(getCurrentUser);

  const newTaskSuccess = useAppSelector(getNewTaskSuccess);
  const newTaskId = useAppSelector(getNewTaskId);
  const navigate = useNavigate();

  useEffect(() => {
    if (newTaskSuccess) {
      dispatch(resetNewTaskSuccess());
      const path = generatePath(ROUTES.editTask.route, { id: newTaskId });
      navigate(path);
    }
  }, [newTaskSuccess, newTaskId, dispatch, navigate]);

  const allTasksButtonStyle = classnames(tasksButtonClass(onlyMyTasks));
  const onlyMyTasksButtonStyle = classnames(tasksButtonClass(!onlyMyTasks));

  const handleAllTasksClick = () => dispatch(showAllTasks());

  const handleOnlyMyTasksClick = () => dispatch(showOnlyMyTasks());

  return (
    <>
      <Row className={styles.wrapper}>
        <h1>Задачи</h1>

        <div className={styles.user}>
          <UserAvatar user={user} />
          <UserMenu />
          <CaretDownOutlined className={styles.menuicon} />
        </div>
      </Row>

      {/* Кнопки все задачи - мои задачи */}
      <Row className={styles.wrapper} justify="space-between">
        <div className={styles.buttons}>
          <Button
            type={onlyMyTasks ? 'text' : 'default'}
            className={allTasksButtonStyle}
            disabled={!onlyMyTasks}
            onClick={handleAllTasksClick}
          >
            <img src={clockIcon} alt="clockIcon" />
            <span>Все</span>
          </Button>
          <Button
            type={onlyMyTasks ? 'default' : 'text'}
            className={onlyMyTasksButtonStyle}
            disabled={onlyMyTasks}
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
