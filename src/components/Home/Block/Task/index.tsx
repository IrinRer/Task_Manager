import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import { BlockType } from 'constants/types/common';
import StatusWithPopover from 'components/Common/StatusWithPopover';
import classnames from 'classnames';
import { TaskContext } from 'components/Home/taskContext';
import Attached from './Attached';
import Progress from './Progress';
import DateString from './Date';
import Tags from './Tags';
import Roles from './Roles';
import Priority from './Priority';
import Title from './Title';
import Options from './Options';
import styles from './index.module.scss';

interface IProps {
  type: BlockType;
}

const Task: React.FC<IProps> = ({ type }) => {
  const task = useContext(TaskContext);
  const taskDateStop = task?.exec_stop;

  const taskDateStopMiliisec = taskDateStop
    ? new Date(taskDateStop).getTime()
    : null;
  const timestamp = new Date().getTime();
  const isTaskOverdue =
    taskDateStopMiliisec &&
    task &&
    task.status.name !== 'Выполнена' &&
    timestamp >= taskDateStopMiliisec;

  if (!task) return null;

  return (
    <Row
      className={classnames(
        styles.wrapper,
        isTaskOverdue ? styles.overdue : '',
      )}
      justify="space-between"
    >
      {/* Заголовок задачи с указателями вложений и прогресса */}
      <Col span={7} className={styles.title}>
        <Title />
        {(task?.storage_files_meta.total > 0 || task?.progress) && (
          <div className={styles.flex}>
            <Attached />
            <Progress />
          </div>
        )}
      </Col>
      {/* Статус со всплывающим селектором смены статуса */}
      <Col span={3} className={styles.status}>
        <StatusWithPopover taskId={task.task_id} />
      </Col>
      {/* Дата */}
      {type !== BlockType.done && (
        <Col span={3} className={styles.date}>
          <DateString />
        </Col>
      )}
      {/* Приоритет */}
      {type !== BlockType.done && (
        <Col span={2} className={styles.priority}>
          <Priority priority={task.priority?.name} />
        </Col>
      )}
      {/* Тэги */}
      <Col span={3} className={styles.tags}>
        <Tags />
      </Col>
      {/* Роли */}
      <Col span={3} className={styles.roles}>
        <Roles />
      </Col>
      {/* Кнопка ... со всплывающими опциями для задачи */}
      <Col span={1} className={styles.options}>
        <Options />
      </Col>
    </Row>
  );
};

export default Task;
