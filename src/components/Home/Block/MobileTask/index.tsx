import React, { useContext } from 'react';
import { BlockType } from 'constants/types/common';
import StatusWithPopover from 'components/Common/StatusWithPopover';
import classnames from 'classnames';
import { useWindowSize } from 'customHooks/useWindowSize';
import {
  DESKTOP_WIDTH_HOMEPAGE_MOVE_ROLES,
  DESKTOP_WIDTH_HOMEPAGE_MOVE_TAGS,
} from 'constants/common';
import { TaskContext } from 'components/Home/taskContext';
import Attached from '../Task/Attached';
import Title from '../Task/Title';
import DateString from '../Task/Date';
import Priority from '../Task/Priority';
import Tags from '../Task/Tags';
import Roles from '../Task/Roles';
import Progress from '../Task/Progress';
import Options from '../Task/Options';
import styles from './index.module.scss';

interface IProps {
  type: BlockType;
}

const MobileTask: React.FC<IProps> = ({ type }) => {
  const size = useWindowSize();
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
    <div
      className={classnames(
        styles.wrapper,
        isTaskOverdue ? styles.overdue : '',
      )}
    >
      <div className={styles.taskLine}>
        <Title />
      </div>

      <div className={styles.taskLine}>
        <div className={styles.flexElem}>
          <StatusWithPopover taskId={task.task_id} />
        </div>
        <div className={styles.flexElem}>
          {type !== BlockType.done && <DateString />}
        </div>
        <div className={styles.flexElem}>
          {type !== BlockType.done && (
            <Priority priority={task.priority?.name} />
          )}
        </div>
        {(size.width || 0) > DESKTOP_WIDTH_HOMEPAGE_MOVE_TAGS && (
          <div className={styles.flexElem}>
            <Tags />
          </div>
        )}
      </div>

      {(size.width || 0) <= DESKTOP_WIDTH_HOMEPAGE_MOVE_ROLES && (
        <div className={styles.taskLine}>
          <div className={styles.flexElem}>
            <Tags />
          </div>
        </div>
      )}

      <div className={classnames(styles.taskLine, styles.between)}>
        {(size.width || 0) <= DESKTOP_WIDTH_HOMEPAGE_MOVE_TAGS &&
          (size.width || 0) > DESKTOP_WIDTH_HOMEPAGE_MOVE_ROLES && (
            <div className={styles.flexElem}>
              <Tags />
            </div>
          )}
        <div className={styles.flexElem}>
          <Roles />
        </div>
        <div className={styles.flexElem}>
          <Attached />
          <Progress />
        </div>
      </div>

      {/* Кнопка ... со всплывающими опциями для задачи */}
      <div className={styles.options}>
        <Options />
      </div>
    </div>
  );
};

export default MobileTask;
