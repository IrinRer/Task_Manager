import React from 'react';
import classnames from 'classnames';
import { shortTitle } from 'helpers/titleLength';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
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
  const navigate = useNavigate();

  const openTask = () => {
    navigate(`${ROUTES.editTask.path}${task_id}`);
  };

  const classNames = classnames(type === 'done' ? styles.done : undefined);
  return (
    <div className={styles.wrapper} onClick={openTask}>
      <span className={classNames}>{shortTitle(title, TITLE_LENGTH)}</span>
    </div>
  );
};

export default Title;
