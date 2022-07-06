import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { ReactComponent as SubscriptionIcon } from 'assets/icons/view.svg';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import { getIsVerifyUserWatcher, getTaskId } from 'store/editTask/selectors';
import {
  deleteTaskMemberAction,
  setTaskMemberAction,
} from 'store/editTask/thunk';
import classnames from 'classnames';
import styles from './index.module.scss';

const Subscribe: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const verifyUserId = useAppSelector(getVerifyIdUser);
  const watcherRoleID = useAppSelector(getWatcherRoleID);
  const isRightsSubscribeTask = useGetRights(RIGHTS_NAMES.subscription);
  const isRightsUnsubscribeTask = useGetRights(RIGHTS_NAMES.unsubscribe);
  const isVerifyUserWatcher = useAppSelector(getIsVerifyUserWatcher);
  const isRights = isRightsSubscribeTask || isRightsUnsubscribeTask;

  const handleWatching = () => {
    if (verifyUserId && watcherRoleID && taskId && !isVerifyUserWatcher) {
      dispatch(
        setTaskMemberAction({
          task_id: taskId,
          assign_user_id: verifyUserId,
          task_role_id: watcherRoleID,
        }),
      );
    }
    if (verifyUserId && watcherRoleID && taskId && isVerifyUserWatcher) {
      dispatch(
        deleteTaskMemberAction({
          task_id: taskId,
          assign_user_id: verifyUserId,
          task_role_id: watcherRoleID,
        }),
      );
    }
  };
  return (
    <Button
      disabled={!isRights}
      className={classnames(
        styles.buttonSubscribe,
        !isRights ? styles.disabled : '',
        isVerifyUserWatcher ? styles.active : '',
      )}
      icon={<SubscriptionIcon />}
      onClick={handleWatching}
    />
  );
};

export default Subscribe;
