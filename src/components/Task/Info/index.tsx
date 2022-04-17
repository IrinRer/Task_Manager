import React, { useEffect } from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchAllStatuses } from 'store/task/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTask,
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getTaskWatchers,
} from 'store/task/selectors';
import styles from './index.module.scss';
import AddMemberButton from './AddMemberButton';

const { Panel } = Collapse;

/* interface IProps {
   a?: string;
}
const Info: React.FC<IProps> = ( { a } ) => {
  const { a } = props; */

const Info: React.FC = () => {
  const dispatch = useDispatch();
  // const defaultStatusName = useAppSelector(getDefaultStatusName);
  const data = useAppSelector(getTask);
  const author = useAppSelector(getTaskAuthor);
  const watchers = useAppSelector(getTaskWatchers);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);
  // const watchers = [];

  useEffect(() => {
    dispatch(fetchAllStatuses());
  }, [dispatch]);

  return (
    <div className={styles.taskInfo}>
      <Collapse
        defaultActiveKey={['1', '2']}
        ghost
        // eslint-disable-next-line react/no-unstable-nested-components
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel
          header="Детали"
          key="1"
          className="site-collapse-custom-panel"
          // className={styles.details}
        >
          <div className={styles.infoLine}>
            <span>Статус</span> <span>{data?.status.name}</span>
          </div>
          <div className={styles.infoLine}>
            <span>Ответственный</span>
            <span>{responsible ? responsible.name : ''}</span>
          </div>
        </Panel>
        <Panel
          header="Участники"
          key="2"
          className="site-collapse-custom-panel"
          // className={styles.members}
        >
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
        </Panel>
      </Collapse>
    </div>
  );
};

export default Info;
