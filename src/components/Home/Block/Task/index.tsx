import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import { BlockType, ROLES } from 'constants/types/common';
import StatusWithPopover from 'components/Common/StatusWithPopover';
import { TaskContext } from 'constants/taskContext';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import { getMyMaxRoleForAllTasks } from 'store/common/roles/selectors';
import Attached from '../Attached';
import Progress from '../Progress';
import DateString from '../Date';
import Tags from '../Tags';
import Roles from '../Roles';
import Priority from '../Priority';
import Title from '../Title';
import Options from '../Options';
import styles from './index.module.scss';

interface IProps {
  type: BlockType;
}

const Task: React.FC<IProps> = ({ type }) => {
  const task = useContext(TaskContext);

  const myMaxRoleAllTasks = useAppSelector(getMyMaxRoleForAllTasks);

  const myMaxRole =
    myMaxRoleAllTasks.find((el) => {
      return el.task_id === task?.task_id;
    })?.maxrole || ROLES.any;

  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editStatus);

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
        {/* isRights ? (
          <Popover
            overlayClassName="popover"
            content={<StatusChange task_id={task.task_id} />}
            trigger="click"
          >
            <div>
              <Status statusName={task.status.name} />
            </div>
          </Popover>
        ) : (
          <Status statusName={task.status.name} />
        ) */}
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
