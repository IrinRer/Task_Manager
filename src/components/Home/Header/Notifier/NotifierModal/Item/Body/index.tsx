import { Avatar } from 'antd';
import classnames from 'classnames';
import { DATE_TIME_FORMAT } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import React, { useContext } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { changeNotificationViewedAction } from 'store/notifications/thunk';
import { NotifierContext } from '../../../notifierContext';
import styles from './index.module.scss';
import ReadIcon from './ReadIcon';

const Body = () => {
  const notification = useContext(NotifierContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let dateCreated;

  if (notification) {
    dateCreated = format(
      new Date(notification.history_command.created),
      DATE_TIME_FORMAT,
      { locale: ru },
    );
  }

  const classNames = classnames(
    styles.wrapper,
    notification?.viewed ? '' : styles.new,
  );

  const openTask = (): void => {
    const path = generatePath(ROUTES.editTask.route, {
      id: notification?.history_command.params.task?.task_id,
    });
    if (notification?.viewed === false) {
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
      <div className={styles.header}>
        {notification?.history_command.params.task?.title}
      </div>
      <div className={styles.body}>
        <Avatar src={notification?.history_command.user.logo} />
        <div className={styles.info}>
          <div className={styles.name}>
            {notification?.history_command.user.name}
          </div>
          <div className={styles.action}>
            {notification?.history_command.command_name}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {notification?.viewed && <ReadIcon />}
        <span>{dateCreated}</span>
      </div>
    </div>
  );
};

export default Body;
