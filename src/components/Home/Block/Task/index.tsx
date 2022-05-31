import React from 'react';
import { Col, Row } from 'antd';
import { BlockType, TTask } from 'constants/types/common';

import Attached from '../Attached';
import Progress from '../Progress';
import DateString from '../Date';
import StatusWithPopover from '../../../Common/StatusWithPopover/StatusWithPopover';
import Tags from '../Tags';
import Roles from '../Roles';
import Priority from '../Priority';
import Title from '../Title';
import Options from '../Options/Options';
import styles from './index.module.scss';

interface IProps {
  task: TTask;
  type: BlockType;
}

const Task: React.FC<IProps> = ({ task, type }) => {
  return (
    <Row className={styles.wrapper} justify="space-between">
      {/* Заголовок задачи с указателями вложений и прогресса */}
      <Col span={7} className={styles.title}>
        <Title title={task.title} type={type} task_id={task.task_id} />
        <div className={styles.flex}>
          <Attached attached={task.storage_files_meta.total} />
          <Progress progress={task.progress} />
        </div>
      </Col>
      {/* Статус со всплывающим селектором смены статуса */}
      <Col span={3} className={styles.status}>
        <StatusWithPopover taskId={task.task_id} />
      </Col>
      {/* Дата */}
      {type !== BlockType.done && (
        <Col span={3} className={styles.date}>
          <DateString dateString={task.created} />
        </Col>
      )}
      {/* Приоритет */}
      {type !== BlockType.done && (
        <Col span={2} className={styles.priority}>
          <Priority priority={task.priority?.name || null} />
        </Col>
      )}
      {/* Тэги */}
      <Col span={3} className={styles.tags}>
        <Tags tags={task.tags} />
      </Col>
      {/* Роли */}
      <Col span={3} className={styles.roles}>
        <Roles roles={task.roles} />
      </Col>
      {/* Кнопка ... со всплывающими опциями для задачи */}
      <Col span={1} className={styles.options}>
        <Options task={task} />
      </Col>
    </Row>
  );
};

export default Task;
