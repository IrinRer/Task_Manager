import React, { useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import Display from 'components/Home';
import Filters from 'components/Home/Filters';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsShowFilter, getTaskToDelete } from 'store/tasks/selectors';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteTaskAction } from 'store/tasks/thunk';
import { setTaskToDelete } from 'store/tasks/slice';
import Notice from 'components/Common/Notice';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import { useWindowSize } from 'customHooks/useWindowSize';
import { MIN_DESKTOP_WIDTH } from 'constants/common';
import styles from './index.module.scss';

const { Sider, Content } = Layout;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskIDtoDelete = useAppSelector(getTaskToDelete);
  const isShowFilter = useAppSelector(getIsShowFilter);
  const size = useWindowSize();

  const handleDeleteTask = useCallback(() => {
    if (taskIDtoDelete) {
      dispatch(setTaskToDelete(null));
      dispatch(deleteTaskAction(taskIDtoDelete));
    }
  }, [dispatch, taskIDtoDelete]);

  const handleCancelDeleteTask = useCallback(() => {
    dispatch(setTaskToDelete(null));
  }, [dispatch]);

  useEffect(() => {
    if (taskIDtoDelete) {
      Notice({
        text: 'Задача удалена',
        textButton: 'Отмена',
        className: 'iconDeleteNotice',
        // duration: 0,
        icon: <RecycleBinIcon />,
        handleOk: handleDeleteTask,
        handleCancel: handleCancelDeleteTask,
      });
    }
  }, [handleCancelDeleteTask, handleDeleteTask, taskIDtoDelete]);

  const optionsCollapsed =
    (size.width || 0) < MIN_DESKTOP_WIDTH
      ? {
          trigger: null,
          collapsed: !isShowFilter && (size.width || 0) < MIN_DESKTOP_WIDTH,
          collapsedWidth: 0,
          width: size.width && size.width < 440 ? size.width : 440,
        }
      : null;

  return (
    <Layout className={styles.tasks}>
      <Sider className={styles.sider} width={250} {...optionsCollapsed}>
        <Filters />
      </Sider>
      <Content>
        {(size.width || 0) < MIN_DESKTOP_WIDTH && isShowFilter ? (
          <div className={styles.mask} />
        ) : null}
        <Display />
      </Content>
    </Layout>
  );
};

export default Home;
