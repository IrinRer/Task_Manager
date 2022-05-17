import React from 'react';
import classnames from 'classnames';
import { shortTitle } from 'helpers/titleLength';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { TITLE_LENGTH } from 'constants/common';
import styles from './index.module.scss';

interface IProps {
  title: string;
  type: string;
  task_id: string;
}
// TODO: Длина обрезки заголовка TITLE_LENGTH будет зависеть от разрешения экрана
// переделается в дальшейшем

const Title: React.FC<IProps> = ({ title, type, task_id }) => {
  const navigate = useNavigate();

  const openTask = () => {
    const path = generatePath(ROUTES.editTask.route, { id: task_id });
    navigate(path);
  };

  const classNames = classnames(type === 'done' ? styles.done : undefined);
  return (
    <div className={styles.wrapper} onClick={openTask}>
      <span className={classNames}>{shortTitle(title, TITLE_LENGTH)}</span>
    </div>
  );
};

export default Title;
