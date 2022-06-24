import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useEffect } from 'react';
import { getTask, getTaskId } from 'store/editTask/selectors';
import { getHistory, isLoading } from 'store/history/selectors';
import { historyAction } from 'store/history/thunk';
import { HISTORY, HISTORY_MAP } from 'constants/history/common';
import Spinner from 'components/Common/Spinner';
import {
  getInfoAboutTask,
  getTaskInfoDateStop,
} from 'store/common/task/selectors';
import { getInfoDate } from 'store/editTask/additionalFunctions/date/selectors';
import { getTag } from 'store/editTask/additionalFunctions/tag/selectors';
import AssignUser from './AssignUser';
import DateTask from './DateTask';
import Status from './Status';
import TagHistory from './Tag';
import CreateTask from './CreateTask';
import Title from './Title';
import Attachments from './Attachments';
import Description from './Description';
import ChecklistAssign from './CheckList/Assign';
import ChecklistTitle from './CheckList/Title';
import ItemChecklist from './CheckList/Item';
import Priority from './Priority';

const History = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(getHistory);
  const taskId = useAppSelector(getTaskId);
  const editTask = useAppSelector(getTask);
  const date = useAppSelector(getInfoDate);

  const tag = useAppSelector(getTag);
  const loadind = useAppSelector(isLoading);

  useEffect(() => {
    if (taskId) {
      dispatch(historyAction(taskId));
    }
  }, [editTask, date, tag]);

  return (
    <>
      {/* не получается сделать через объектный литерал :с */}
      {loadind ? (
        <Spinner />
      ) : (
        history.map((item) => {
          switch (item.command_code) {
            case HISTORY.tagAssign:
              return <TagHistory item={item} key={item.history_command_id} />;
            case HISTORY.roleAssign:
              return <AssignUser item={item} key={item.history_command_id} />;
            case HISTORY.roleUnassign:
              return <AssignUser item={item} key={item.history_command_id} />;
            case HISTORY.dateChange:
              return <DateTask item={item} key={item.history_command_id} />;
            case HISTORY.statusChange:
              return <Status item={item} key={item.history_command_id} />;
            case HISTORY.taskCreate:
              return <CreateTask item={item} key={item.history_command_id} />;
            case HISTORY.titleChange:
              return <Title item={item} key={item.history_command_id} />;
            case HISTORY.fileAssign:
            case HISTORY.fileUnassign:
              return <Attachments item={item} key={item.history_command_id} />;
            case HISTORY.tagUnassign:
              return <TagHistory item={item} key={item.history_command_id} />;
            case HISTORY.descriptionChange:
              return <Description item={item} key={item.history_command_id} />;
            case HISTORY.checklistUnassign:
            case HISTORY.checklistAssign:
              return (
                <ChecklistAssign item={item} key={item.history_command_id} />
              );
            case HISTORY.titleChecklistChange:
              return (
                <ChecklistTitle item={item} key={item.history_command_id} />
              );
            case HISTORY.itemChecklistCreate:
            case HISTORY.itemChecklistComplete:
            case HISTORY.itemChecklistDelete:
              return (
                <ItemChecklist item={item} key={item.history_command_id} />
              );
           case HISTORY.priorityChange: 
           return (
            <Priority item={item} key={item.history_command_id} />
          );

            default:
              return null;
          }
        })
      )}
    </>
  );
};

export default History;
