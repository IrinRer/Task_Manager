import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import React, { useEffect } from 'react';
import notification from 'assets/icons/notification.svg';
import { loadNotificationsAction } from 'store/notifications/thunk';
import classnames from 'classnames';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsNewNotifications } from 'store/notifications/selectors';
import styles from './index.module.scss';

const Notifier: React.FC = () => {
  const dispatch = useAppDispatch();
  const isNewNotifications = useAppSelector(getIsNewNotifications);

  const classNames = classnames(
    styles.notification,
    isNewNotifications ? styles.new : '',
  );

  useEffect(() => {
    dispatch(loadNotificationsAction({ viewed: false, page: 1, per_page: 50 }));
  }, [dispatch]);

  return (
    <div className={classNames}>
      <img src={notification} alt="notificationIcon" />
    </div>
  );
};

export default Notifier;
