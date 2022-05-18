import React, { useEffect } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setPage, setSortField, setTasksOnPage } from 'store/tasks/slice';
import { getViewParameters } from 'store/tasks/selectors';
import { Col, Pagination, Row } from 'antd';
import { BlockType, SortField, TTask } from 'constants/types/common';
import styles from './index.module.scss';
import Sorter from './Sorter';
import Task from './Task';
import PaginationLabel from './PaginationLabel';
import { getTasksSelector, getTotalTasksSelector } from './service';

enum BlockTitle {
  in = 'Входящие',
  work = 'В работе',
  done = 'Завершено',
}

interface IProps {
  blockType: BlockType;
}
const Block: React.FC<IProps> = ({ blockType }) => {
  const dispatch = useAppDispatch();
  const viewParameters = useAppSelector(getViewParameters);
  const tasks = useAppSelector(getTasksSelector(blockType));
  const tasksTotal = useAppSelector(getTotalTasksSelector(blockType));

  const { sortField, page, tasksOnPage } = viewParameters[blockType];

  // Если число задач обновилось и страниц стало больше чем хватает задач, уменьшаем число страниц
  useEffect(() => {
    if (tasksTotal < tasksOnPage * (page - 1)) {
      const newPage = Math.floor(tasksTotal / tasksOnPage) + 1;
      dispatch(setPage({ blockType, page: newPage }));
    }
  }, [tasksOnPage, tasksTotal, page, blockType, dispatch]);

  // Хэндлеры для изменения параметров отображения - сортировки, страницы и задач на странице

  const handlePageChange = (
    // формат аргументов типизирован в антдизайне,  у нас второй аргумент не используется
    newPage: number,
    pageSize: number = tasksOnPage,
  ) => {
    dispatch(setPage({ blockType, page: newPage }));
  };

  const handleTasksOnPageChange = (newTasksOnPage: number) => {
    if (newTasksOnPage > tasksTotal - 1) {
      dispatch(setTasksOnPage({ blockType, tasksOnPage: tasksTotal - 1 }));
    } else if (newTasksOnPage < tasksTotal && newTasksOnPage > 0) {
      // При увеличении числа задач на странице в конце нужно проверить что страница не выходит за диапазон задач
      if (newTasksOnPage * page > tasksTotal) {
        handlePageChange(Math.ceil(tasksTotal / newTasksOnPage));
      }
      dispatch(setTasksOnPage({ blockType, tasksOnPage: newTasksOnPage }));
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
          tasks.map((task: TTask) => {
            return <Task key={task.task_id} task={task} type={blockType} />;
          })
        ) : (
          <p>Нет задач для отображения</p>
        )}
      </Col>

      {/* Пагинация */}
      <Col className={styles.pagination} span={24}>
        {tasksTotal > tasksOnPage && (
          <>
            <Pagination
              total={tasksTotal}
              current={page}
              defaultCurrent={1}
              pageSize={tasksOnPage}
              defaultPageSize={tasksOnPage}
              showTotal={paginationTotal}
              onChange={handlePageChange}
            />
            <PaginationLabel
              pageSize={tasksOnPage}
              handler={handleTasksOnPageChange}
            />
          </>
        )}
      </Col>
    </Row>
  );
};

export default Block;
