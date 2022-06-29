import React, { useContext } from 'react';
import classnames from 'classnames';
import { shortTitle } from 'helpers/titleLength';
import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { TITLE_LENGTH } from 'constants/common';
import { TaskStatuses } from 'constants/types/common';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';

// TODO: Длина обрезки заголовка TITLE_LENGTH будет зависеть от разрешения экрана
// переделается в дальшейшем

const Title: React.FC = () => {
  const task = useContext(TaskContext);
  const path = generatePath(ROUTES.editTask.route, { id: task?.task_id });

  const classNames = classnames(
    task?.status.name === TaskStatuses.Completed ? styles.done : undefined,
  );
  return (
    <div className={styles.wrapper}>
      <Link className={classNames} target="_blank" to={path}>
        {task?.title ? shortTitle(task.title, TITLE_LENGTH) : ''}
      </Link>
    </div>
  );
};

export default Title;
