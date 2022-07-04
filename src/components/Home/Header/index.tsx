import React, { useEffect } from 'react';
import classnames from 'classnames';
import { Button, Col, Row } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsShowFilter, getOnlyMyTasksFlag } from 'store/tasks/selectors';
import { showOnlyMyTasks, showAllTasks, toggleFilter } from 'store/tasks/slice';
import clockIcon from 'assets/icons/clock.svg';
import personIcon from 'assets/icons/person.svg';
import { getCurrentUser } from 'store/users/selectors';
import UserAvatar from 'components/Common/UserAvatar';
import { ROUTES } from 'constants/routes';
import { generatePath, useNavigate } from 'react-router-dom';
import { getNewTaskId, getNewTaskSuccess } from 'store/createTask/selectors';
import { resetNewTaskSuccess } from 'store/createTask/slice';
import { CaretDownOutlined } from '@ant-design/icons';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import { useWindowSize } from 'customHooks/useWindowSize';
import { MIN_DESKTOP_WIDTH } from 'constants/common';
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg';
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
  const size = useWindowSize();
  const onlyMyTasks = useAppSelector(getOnlyMyTasksFlag);
  const isShowFilter = useAppSelector(getIsShowFilter);

  // Получаем пользователя для отображения данных - аватара и тд
  const user = useAppSelector(getCurrentUser);

  const newTaskSuccess = useAppSelector(getNewTaskSuccess);
  const newTaskId = useAppSelector(getNewTaskId);
  const navigate = useNavigate();

  const isRights = useGetRights(RIGHTS_NAMES.createTask);

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

  const handleFilterClick = () => {
    if (isShowFilter) {
      dispatch(filtersCleared());
      dispatch(fetchTasksAction());
    }
    dispatch(toggleFilter());
  };

  return (
    <>
      <Row className={styles.titleRow}>
        <h1>Задачи</h1>

        <div className={styles.user}>
          <UserAvatar user={user} />
          <UserMenu />
          <CaretDownOutlined className={styles.menuicon} />
        </div>
      </Row>

      {/* Кнопки все задачи - мои задачи */}
      <Row className={styles.buttonsRow} justify="space-between">
        <div className={styles.buttons}>
          {(size.width || 0) < MIN_DESKTOP_WIDTH && (
            <Button
              type={isShowFilter ? 'default' : 'text'}
              className={styles.filter}
              onClick={handleFilterClick}
            >
              <FilterIcon />
            </Button>
          )}
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
          {isRights && <AddNewTask />}
        </Col>
      </Row>
    </>
  );
};

export default Header;
