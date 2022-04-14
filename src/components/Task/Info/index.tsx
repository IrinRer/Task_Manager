import React, { useEffect } from 'react';
import { Collapse, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchAllStatuses } from 'store/task/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getDefaultStatusName,
  getTask,
  getTaskAuthor,
  getTaskResponsible,
  getTaskWatchers,
} from 'store/task/selectors';
import styles from './index.module.scss';
import AddMemberButton from './AddMemberButton';

const { Option } = Select;
const { Panel } = Collapse;

/* interface IProps {
   a?: string;
}
const Info: React.FC<IProps> = ( { a } ) => {
  const { a } = props; */

const Info: React.FC = () => {
  const dispatch = useDispatch();
  const defaultStatusName = useAppSelector(getDefaultStatusName);
  const data = useAppSelector(getTask);
  const author = useAppSelector(getTaskAuthor);
  // const watchers = useAppSelector(getTaskWatchers);
  const responsible = useAppSelector(getTaskResponsible);
  const watchers = [];

  useEffect(() => {
    dispatch(fetchAllStatuses());
  }, [dispatch]);

  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  /* const children: any[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
    );
  } */

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
            <span>Статус</span> <span>{data.status.name}</span>
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
            <span>Наблюдатель</span>
            <div className={styles.watchers}>
              {watchers.length !== 0 ? (
                watchers.map((el) => (
                  <span className={styles.members}>{el}</span>
                ))
              ) : (
                <AddMemberButton multi />
              )}
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Info;
