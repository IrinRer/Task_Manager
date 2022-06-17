import React from 'react';
import { Button, Modal, Spin } from 'antd';
import {
  getAllNotificationsLength,
  getNewNotificationsStore,
  getNotificationsLoading,
  getNotificationsToShow,
  getShowCount,
  getTotalNotificationsCount,
  getViewedNotificationsStore,
} from 'store/notifications/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { INotification } from 'store/notifications/types';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { NOTIFICATION_COUNT_INCREMENT } from 'constants/common';
import {
  incrementNewNotificationsPage,
  incrementViewedNotificationsPage,
  setShowCount,
} from 'store/notifications/slice';
import {
  loadNewNotificationsAction,
  loadViewedNotificationsAction,
} from 'store/notifications/thunk';

import Header from './Header';
import Item from './Item';
import styles from './index.module.scss';
import { NotifierContext } from '../notifierContext';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifierModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  const totalNotifications = useAppSelector(getTotalNotificationsCount);
  const loading = useAppSelector(getNotificationsLoading);
  const loadedNotificationsCount = useAppSelector(getAllNotificationsLength);
  const notifications = useAppSelector(getNotificationsToShow);
  const newNotificationsStore = useAppSelector(getNewNotificationsStore);
  const viewedNotificationsStore = useAppSelector(getViewedNotificationsStore);
  const showCount = useAppSelector(getShowCount);
  const dispatch = useAppDispatch();

  const handleShowMore = () => {
    if (showCount > totalNotifications) {
      return;
    }
    const newShowCount =
      showCount === 1
        ? showCount + NOTIFICATION_COUNT_INCREMENT - 1
        : showCount + NOTIFICATION_COUNT_INCREMENT;

    if (
      (newShowCount > loadedNotificationsCount &&
        totalNotifications > loadedNotificationsCount) ||
      viewedNotificationsStore.pagination.items_total === 0
    ) {
      if (
        newNotificationsStore.pagination.page_current <
        newNotificationsStore.pagination.page_total
      ) {
        dispatch(incrementNewNotificationsPage());
        dispatch(loadNewNotificationsAction());
      }
      if (newShowCount > newNotificationsStore.pagination.items_total) {
        dispatch(incrementViewedNotificationsPage());
        dispatch(loadViewedNotificationsAction());
      }
    }
    dispatch(setShowCount(newShowCount));
  };

  return (
    <div className={styles.wrapper}>
      <Modal
        className="notifier-modal"
        visible={isOpen}
        width={460}
        closable={false}
        onCancel={onClose} /* onOk={handleOk}  */
      >
        <Header />
        <div className={styles.list}>
          {notifications.length > 0
            ? notifications
                .slice(0, showCount)
                .map((notification: INotification) => {
                  return (
                    <NotifierContext.Provider
                      key={notification.subscribe_notify_id}
                      value={notification}
                    >
                      <Item />
                    </NotifierContext.Provider>
                  );
                })
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
