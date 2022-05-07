import React, { useState } from 'react';
import classnames from 'classnames';
import { shortTitle } from 'helpers/titleLength';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getHomeTaskId } from 'store/common/task/selectors';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { setTaskId } from 'store/common/task/slice';
import styles from './index.module.scss';

interface IProps {
  title: string;
  type: string;
  task_id: string;
}
// Длина обрезки заголовка будет зависеть от разрешения экрана
// переделается в дальшейшем
const TITLE_LENGTH = 100;

const Title: React.FC<IProps> = ({ title, type, task_id }) => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getHomeTaskId);
  const [isShouldOpenTask, setIsShouldOpenTask] = useState<boolean>(false);

  const openTask = () => {
    dispatch(setTaskId(task_id));
    setIsShouldOpenTask(true);
  };

  if (taskId && isShouldOpenTask) {
    return <Navigate to={ROUTES.editTask.path} />;
  }

  const classNames = classnames(type === 'done' ? styles.done : undefined);
  return (
    <div className={styles.wrapper} onClick={openTask}>
      <span className={classNames}>{shortTitle(title, TITLE_LENGTH)}</span>
    </div>
  );
};

export default Title;
