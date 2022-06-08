import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import { BlockType } from 'constants/types/common';

import StatusWithPopover from 'components/Common/StatusWithPopover';
import { TaskContext } from 'constants/taskContext';
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

  if (!task) return null;

  return (
    <Row className={styles.wrapper} justify="space-between">
      {/* Заголовок задачи с указателями вложений и прогресса */}
      <Col span={7} className={styles.title}>
        <Title />
        <div className={styles.flex}>
          <Attached />
          <Progress />
        </div>
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
          <Priority />
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
