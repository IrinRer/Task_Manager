import React from 'react';
import classnames from 'classnames';
import { shortTitle } from 'helpers/titleLength';
import styles from './index.module.scss';

interface IProps {
  title: string;
  type: string;
}
// Длина обрезки заголовка будет зависеть от разрешения экрана
// переделается в дальшейшем
const TITLE_LENGTH = 100;

const Title: React.FC<IProps> = ({ title, type }) => {
  const classNames = classnames(type === 'done' ? styles.done : undefined);
  return (
    <div className={styles.wrapper}>
      <span className={classNames}>{shortTitle(title, TITLE_LENGTH)}</span>
    </div>
  );
};

export default Title;
