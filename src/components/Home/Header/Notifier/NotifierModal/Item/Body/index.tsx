import { Avatar } from 'antd';
import classnames from 'classnames';
import { ROUTES } from 'constants/routes';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import React, { useContext } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { changeNotificationViewedAction } from 'store/notifications/thunk';
import { NotifierContext } from '../../../notifierContext';
import DateCreated from './DateCreated';
import styles from './index.module.scss';
import Message from './Message';
import Name from './Name';
import ReadIcon from './ReadIcon';
import Title from './Title';

const Body = () => {
  const notification = useContext(NotifierContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Из-за инициализации контекста по типу notification может быть null. По факту - нет
  if (!notification) return null;

  const classNames = classnames(
    styles.wrapper,
    notification.viewed ? '' : styles.new,
  );

  const openTask = (): void => {
    let taskId;

    if (notification.history_command.params?.task?.task_id) {
      taskId = notification.history_command.params?.task?.task_id;
    } else if (notification.history_command.relations) {
      const index = notification.history_command.relations.findIndex(
        (relation) => relation.relation_id.length > 0,
      );
      if (index >= 0) {
        taskId = notification.history_command.relations[index].relation_id;
      }
    }

    if (!taskId) return;

    const path = generatePath(ROUTES.editTask.route, {
      id: taskId,
    });
    if (notification.viewed === false) {
      dispatch(
        changeNotificationViewedAction({
          viewed: true,
          subscribe_notify_id: [notification.subscribe_notify_id],
        }),
      );
    }
    navigate(path);
  };

  return (
    <div className={classNames} onClick={openTask}>
      <header>
        <Title />
      </header>
      <main>
        <Avatar src={notification.history_command.user.logo} />
        <div className={styles.info}>
          <Name />
          <Message />
        </div>
      </main>
      <footer>
        {notification.viewed && <ReadIcon />}
        <DateCreated />
      </footer>
    </div>
  );
};

export default Body;
