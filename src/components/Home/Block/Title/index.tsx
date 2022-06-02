import React from 'react';
import classnames from 'classnames';
import { shortTitle } from 'helpers/titleLength';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { TITLE_LENGTH } from 'constants/common';
import styles from './index.module.scss';
import { TaskStatuses, TTask } from 'constants/types/common';

interface IProps {
  task: TTask;
}
// TODO: Длина обрезки заголовка TITLE_LENGTH будет зависеть от разрешения экрана
// переделается в дальшейшем

const Title: React.FC<IProps> = ({ task }) => {
  const navigate = useNavigate();

  const openTask = (): void => {
    const path = generatePath(ROUTES.editTask.route, { id: task.task_id });
    navigate(path);
  };

  const classNames = classnames(
    task.status.name === TaskStatuses.Completed ? styles.done : undefined,
  );
  return (
    <div className={styles.wrapper} onClick={openTask}>
      <span className={classNames}>{shortTitle(task.title, TITLE_LENGTH)}</span>
    </div>
  );
};

export default Title;
