import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import React, { useEffect } from 'react';
import notification from 'assets/icons/notification.svg';
import { loadNewNotificationsAction } from 'store/notifications/thunk';
import classnames from 'classnames';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getIsNewNotifications,
  getNotificationsLoading,
  getShowNotificationModal,
} from 'store/notifications/selectors';
import {
  initNotificationsToShow,
  resetNotifications,
  setShowNotificationModal,
} from 'store/notifications/slice';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import NotifierModal from './NotifierModal';
import styles from './index.module.scss';

const Notifier: React.FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const isNewNotifications = useAppSelector(getIsNewNotifications);
  const showNotificationModal = useAppSelector(getShowNotificationModal);
  const loading = useAppSelector(getNotificationsLoading);

  const classNames = classnames(
    styles.notification,
    isNewNotifications && !loading ? styles.new : '',
  );

  useEffect(() => {
    dispatch(loadNewNotificationsAction());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(setShowNotificationModal(true));
    dispatch(initNotificationsToShow());
  };

  const handleClose = () => {
    dispatch(setShowNotificationModal(false));
    dispatch(resetNotifications());
    dispatch(loadNewNotificationsAction());
  };

  return (
    <>
      <div onClick={handleClick} className={classNames}>
        {loading ? (
          <Spin size="small" />
        ) : (
          <img src={notification} alt="notificationIcon" />
        )}
      </div>

      {/* При открытии модального окна убираем нашу модалку чтоб не мигала. isModalOpen запаздывает потому что рендеринг */}
      {location.pathname === '/' ? (
        <NotifierModal isOpen={showNotificationModal} onClose={handleClose} />
      ) : null}
    </>
  );
};

export default Notifier;
