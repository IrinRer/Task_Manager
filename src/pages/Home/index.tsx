import React, { useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import Display from 'components/Home';
import Filters from 'components/Home/Filters';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskToDelete } from 'store/tasks/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteTaskAction } from 'store/tasks/thunk';
import { setTaskToDelete } from 'store/tasks/slice';
import Notice from 'components/Common/Notice';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import styles from './index.module.scss';

const { Sider, Content } = Layout;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskIDtoDelete = useAppSelector(getTaskToDelete);

  const handleDeleteTask = useCallback(() => {
    console.log('Elfkztv задачу');
    // dispatch(deleteTaskAction(taskIDtoDelete));
    dispatch(setTaskToDelete(null));
  }, [dispatch]);

  useEffect(() => {
    if (taskIDtoDelete) {
      Notice({
        text: 'Задача удалена',
        textButton: 'Отмена',
        className: 'iconDeleteNotice',
        duration: 0,
        icon: <RecycleBinIcon />,
        handleOk: handleDeleteTask,
      });
    }
  }, [handleDeleteTask, taskIDtoDelete]);

  return (
    <Layout className={styles.tasks}>
      <Sider className={styles.sider} width={250}>
        <Filters />
      </Sider>
      <Content>
        <Display />
      </Content>
    </Layout>
  );
};

export default Home;
