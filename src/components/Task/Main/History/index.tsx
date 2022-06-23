import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useEffect } from 'react';
import { getTaskId } from 'store/editTask/selectors';
import { getHistory } from 'store/history/selectors';
import { historyAction } from 'store/history/thunk';
import { HISTORY } from 'constants/common';
import AssignUser from './AssignUser';
import DateTask from './DateTask';
import Status from './Status';
import TagHistory from './Tag';
import CreateTask from './CreateTask';
import Title from './Title';

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
    if (item.command_code === HISTORY.tagAssign) {
      return <TagHistory item={item} key={item.history_command_id} />;
    }
    if (item.command_code === HISTORY.roleAssign) {
      return <AssignUser item={item} key={item.history_command_id} />;
    }

    if (item.command_code === HISTORY.roleUnassign) {
      return <AssignUser item={item} key={item.history_command_id} />;
    }

    if (item.command_code === HISTORY.dateChange) {
      return <DateTask item={item} key={item.history_command_id} />;
    }

    if (item.command_code === HISTORY.statusChange) {
      return <Status item={item} key={item.history_command_id} />;
    }

    if (item.command_code === HISTORY.taskCreate) {
      return <CreateTask item={item} key={item.history_command_id} />;
    }

    if(item.command_code === HISTORY.titleChange) {
      return <Title item={item} key={item.history_command_id}/>
    }

    return null;
  });
};

export default History;
