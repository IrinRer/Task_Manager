import { Row } from 'antd';
import Preloader from 'components/Common/Preloader';
import { ROUTES } from 'constants/routes';
import { BlockType } from 'constants/types/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTaskId } from 'store/common/task/slice';
import { getNewTaskId, selectTasksLoading } from 'store/tasks/selectors';
import { resetNewTaskId } from 'store/tasks/slice';
import Block from './Block';
import Header from './Header';
import styles from './index.module.scss';

const Display: React.FC = () => {
  const loading = useAppSelector(selectTasksLoading);
  const newTaskId = useAppSelector(getNewTaskId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (newTaskId) {
      dispatch(setTaskId(newTaskId));
      dispatch(resetNewTaskId());
      navigate(ROUTES.editTask.path);
    }
  }, [newTaskId, dispatch, navigate]);

  return (
    <Row className={styles.wrapper}>
      <Header />
      {loading ? (
        <Preloader size="large" />
      ) : (
        <>
          <Block blockType={BlockType.in} />
          <Block blockType={BlockType.work} />
          <Block blockType={BlockType.done} />
        </>
      )}
    </Row>
  );
};

export default Display;
