import React, { useEffect, useRef } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setPage, setSortField, setTasksOnPage } from 'store/tasks/slice';
import { getViewParameters } from 'store/tasks/selectors';
import { Col, Pagination, Row } from 'antd';

import { BlockType, SortField } from 'constants/types/common';
import { BlockTitle, MIN_DESKTOP_WIDTH_HOMEPAGE } from 'constants/common';
import { TaskContext } from 'components/Home/taskContext';
import { useWindowSize } from 'customHooks/useWindowSize';
import { IResponseTask } from 'store/common/task/types';

import Sorter from './Sorter';
import Task from './Task';
import PaginationLabel from './PaginationLabel';
import { getTasksSelector, getTotalTasksSelector } from './service';
import styles from './index.module.scss';
import MobileTask from './MobileTask';

interface IProps {
  blockType: BlockType;
}
const Block: React.FC<IProps> = ({ blockType }) => {
  const dispatch = useAppDispatch();
  const size = useWindowSize();
  const pageRef = useRef<HTMLDivElement>(null);
  const viewParameters = useAppSelector(getViewParameters);
  const tasks = useAppSelector(getTasksSelector(blockType));
  const tasksTotal = useAppSelector(getTotalTasksSelector(blockType));

  const { sortField, page, tasksOnPage } = viewParameters[blockType];

  // Если число задач обновилось и страниц стало больше чем хватает задач, уменьшаем число страниц
  useEffect(() => {
    if (tasksTotal < tasksOnPage * (page - 1)) {
      const newPage = Math.ceil(tasksTotal / tasksOnPage);
      dispatch(setPage({ blockType, page: newPage }));
    }
    /*     if (pageRef?.current) {
      pageRef.current.scrollIntoView({
        block: 'center',
      });
    } */
  }, [tasksOnPage, tasksTotal, page, blockType, dispatch]);

  // Хэндлеры для изменения параметров отображения - сортировки, страницы и задач на странице

  const handlePageChange = (
    // формат аргументов типизирован в антдизайне,  у нас второй аргумент не используется
    newPage: number,
    pageSize: number = tasksOnPage,
  ) => {
    dispatch(setPage({ blockType, page: newPage }));
  };

  const handleTasksOnPageChange = (value: number) => {
    const newTasksOnPage = Math.min(value, tasksTotal);
    dispatch(setTasksOnPage({ blockType, tasksOnPage: newTasksOnPage }));
    if (newTasksOnPage * page > tasksTotal) {
      const lastPage = Math.ceil(tasksTotal / newTasksOnPage);
      handlePageChange(lastPage);
    }
  };

  const handleSortFieldChange = (newSortField: SortField) => {
    dispatch(setSortField({ blockType, sortField: newSortField }));
  };

  const paginationTotal = (total: number, range: number[]): string =>
    `${range[0]}-${range[1]} из ${total}`;

  return (
    <Row className={styles.wrapper}>
      {/* Шапка блока */}
      <Col className={styles.header}>
        <h2>{BlockTitle[blockType]}</h2>
        <Sorter
          onSelect={handleSortFieldChange}
          selectValue={sortField}
          blockType={blockType}
        />
      </Col>

      {/* Задачи */}
      <Col span={24}>
        {tasks.length > 0 ? (
          tasks.map((task: IResponseTask) => {
            return (
              <TaskContext.Provider key={task.task_id} value={task}>
                {(size.width || 0) < MIN_DESKTOP_WIDTH_HOMEPAGE && (
                  <MobileTask type={blockType} />
                )}
                {(size.width || 0) >= MIN_DESKTOP_WIDTH_HOMEPAGE && (
                  <Task type={blockType} />
                )}
              </TaskContext.Provider>
            );
          })
        ) : (
          <p className={styles.emptyTask}>Нет задач для отображения</p>
        )}
      </Col>

      {/* Пагинация */}
      <Col ref={pageRef} className={styles.pagination} span={24}>
        <>
          <Pagination
            total={tasksTotal}
            current={page}
            defaultCurrent={1}
            pageSize={tasksOnPage}
            defaultPageSize={tasksOnPage}
            showSizeChanger={false}
            showTotal={paginationTotal}
            onChange={handlePageChange}
          />
          <PaginationLabel
            pageSize={tasksOnPage}
            handler={handleTasksOnPageChange}
          />
        </>
      </Col>
    </Row>
  );
};

export default Block;
