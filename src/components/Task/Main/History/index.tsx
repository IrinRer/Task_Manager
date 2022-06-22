import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useEffect } from 'react';
import { getTaskId } from 'store/editTask/selectors';
import { getHistory } from 'store/history/selectors';
import { historyAction } from 'store/history/thunk';
import { HISTORY_COMMAND } from 'constants/common';
import CustomTag from 'components/Common/CustomTag';
import styles from './index.module.scss';
import User from './User';
import DateHistory from './DateHistory';
import AssignUser from './AssignUser';
import DateTask from './DateTask';
import Status from './Status';
import TagHistory from './Tag';

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(getHistory);
  const taskId = useAppSelector(getTaskId);

  useEffect(() => {
    if (taskId) {
      dispatch(historyAction(taskId));
    }
  }, [taskId]);

  return history.map((item) => {
    if (item.params.tag) {
      return <TagHistory item={item} key={item.history_command_id} />;
    }
    if (item.params.assign_user) {
      return <AssignUser item={item} key={item.history_command_id} />;
    }

    if (item.params.exec_stop) {
      return <DateTask item={item} key={item.history_command_id} />;
    }

    if (item.params.status) {
      return <Status item={item} key={item.history_command_id} />;
    }

    return null;
  });
};

export default History;
