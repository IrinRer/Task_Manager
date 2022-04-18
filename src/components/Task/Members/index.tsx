import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getTaskWatchers,
} from 'store/task/selectors';
import styles from './index.module.scss';
import AddMemberButton from '../Info/AddMemberButton';

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const watchers = useAppSelector(getTaskWatchers);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);

  return (
    <>
      <div className={styles.infoLine}>
        <span>Автор</span>{' '}
        <span className={styles.members}>{author ? author.name : ''}</span>
      </div>
      <div className={styles.infoLine}>
        <span>Ответственный</span>
        <span className={styles.members}>
          {responsible ? responsible.name : ''}
        </span>
      </div>
      <div className={styles.infoLine}>
        <span>Исполнитель</span>
        <span className={styles.members}>
          {implementer ? implementer.name : ''}
        </span>
      </div>
      <div className={styles.infoLine}>
        <span>Наблюдатель</span>
        <div className={styles.watchers}>
          {watchers.length !== 0
            ? watchers.map((el) => (
                <span className={styles.members}>{el.name}</span>
              ))
            : ''}
          <AddMemberButton multi />
        </div>
      </div>
    </>
  );
};

export default Info;
