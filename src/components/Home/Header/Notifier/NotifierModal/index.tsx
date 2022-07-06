import React from 'react';
import { Button, Modal, Spin } from 'antd';
import {
  getAllNotificationsLength,
  getNewNotificationsStore,
  getNotificationsLoading,
  getNotificationsToShow,
  getShowCount,
  getShowNotificationModal,
  getTotalNotificationsCount,
} from 'store/notifications/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { INotification } from 'store/notifications/types';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  incrementNewNotificationsPage,
  incrementViewedNotificationsPage,
  setShowCount,
} from 'store/notifications/slice';
import {
  loadNewNotificationsAction,
  loadViewedNotificationsAction,
} from 'store/notifications/thunk';

import { NOTIFICATION_COUNT_INCREMENT } from 'constants/notify';
import Header from './Header';
import Item from './Item';
import styles from './index.module.scss';
import { NotifierContext } from '../notifierContext';

interface IProps {
  onClose: () => void;
}

const NotifierModal: React.FC<IProps> = ({ onClose }) => {
  const isOpen = useAppSelector(getShowNotificationModal);
  const totalNotifications = useAppSelector(getTotalNotificationsCount);
  const loading = useAppSelector(getNotificationsLoading);
  const loadedNotificationsCount = useAppSelector(getAllNotificationsLength);
  const notifications = useAppSelector(getNotificationsToShow);
  const newNotificationsStore = useAppSelector(getNewNotificationsStore);
  const showCount = useAppSelector(getShowCount);
  const dispatch = useAppDispatch();

  const nextShowCount = () => {
    // Для только что открытого окна показывается 1. При показать больше прибавляем инкремент
    return showCount === 1
      ? showCount + NOTIFICATION_COUNT_INCREMENT - 1
      : showCount + NOTIFICATION_COUNT_INCREMENT;
  };

  const calculateParameters = (newShowCount: number) => {
    // Если надо показывать больше чем загружено, и всего на бэке больше чем загружено
    const needLoadNotifications =
      (newShowCount > loadedNotificationsCount &&
        totalNotifications >= loadedNotificationsCount) ||
      newNotificationsStore.pagination.items_total === 0;
    // Если страница новых меньше тотал, подгружаем новые.
    const morePagesToLoadNew =
      newNotificationsStore.pagination.page_current <
      newNotificationsStore.pagination.page_total;
    // Если число отображаемых больше тотал новых подгружаем прочитанные.
    const notEnoughNew =
      newShowCount > newNotificationsStore.pagination.items_total;

    return { needLoadNotifications, morePagesToLoadNew, notEnoughNew };
  };

  const handleShowMore = () => {
    // Когда грузятся только новые уведомления, totalNotifications равно totalNew, поэтому <=
    if (showCount <= totalNotifications || totalNotifications === 0) {
      const newShowCount = nextShowCount();
      const { needLoadNotifications, morePagesToLoadNew, notEnoughNew } =
        calculateParameters(newShowCount);

      if (needLoadNotifications) {
        if (morePagesToLoadNew) {
          dispatch(incrementNewNotificationsPage());
          dispatch(loadNewNotificationsAction());
        }
        if (notEnoughNew) {
          dispatch(incrementViewedNotificationsPage());
          dispatch(loadViewedNotificationsAction());
        }
      }
      dispatch(setShowCount(newShowCount));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Modal
        className="notifier-modal"
        visible={isOpen}
        width={460}
        closable={false}
        onCancel={onClose}
      >
        <Header />
        <div className={styles.list}>
          {notifications.length > 0
            ? notifications.map((notification: INotification) =>
                notification ? (
                  <NotifierContext.Provider
                    key={notification.subscribe_notify_id}
                    value={notification}
                  >
                    <Item />
                  </NotifierContext.Provider>
                ) : null,
              )
            : null}
        </div>
        {loading ? <Spin /> : null}
        <Button className={styles.showMore} onClick={handleShowMore}>
          Показать больше
        </Button>
      </Modal>
    </div>
  );
};

export default NotifierModal;
