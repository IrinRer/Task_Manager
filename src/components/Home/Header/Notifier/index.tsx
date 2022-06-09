import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import React, { useEffect, useState } from 'react';
import notification from 'assets/icons/notification.svg';
import { loadNotificationsAction } from 'store/notifications/thunk';
import classnames from 'classnames';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getIsNewNotifications } from 'store/notifications/selectors';
import styles from './index.module.scss';
import NotifierModal from './NotifierModal';

const Notifier: React.FC = () => {
  const dispatch = useAppDispatch();
  const isNewNotifications = useAppSelector(getIsNewNotifications);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const classNames = classnames(
    styles.notification,
    isNewNotifications ? styles.new : '',
  );

  useEffect(() => {
    dispatch(loadNotificationsAction({ viewed: false, page: 1, per_page: 50 }));
  }, [dispatch]);

  const handleClick = () => {
    setShowNotificationModal(true);
  };

  const handleClose = () => {
    setShowNotificationModal(false);
  };

  return (
    <>
      <div onClick={handleClick} className={classNames}>
        <img src={notification} alt="notificationIcon" />
      </div>
      <NotifierModal isOpen={showNotificationModal} onClose={handleClose} />
    </>
  );
};

export default Notifier;
