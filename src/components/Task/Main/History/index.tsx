import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import classNames from 'classnames';
import historyIcon from 'assets/icons/history.svg';
import React, { useEffect, useRef, useState } from 'react';
import { getTask, getTaskId } from 'store/editTask/selectors';
import { Button } from 'antd';
import { getHistory, isLoading, totalCount } from 'store/history/selectors';
import { historyAction, viewFileHistory } from 'store/history/thunk';
import { getStorageFile } from 'store/editTask/attachments/selectors';
import { HISTORY } from 'constants/history/common';
import Spinner from 'components/Common/Spinner';
import { getInfoDate } from 'store/editTask/additionalFunctions/date/selectors';
import { getTag } from 'store/editTask/additionalFunctions/tag/selectors';
import { getPriority } from 'store/editTask/additionalFunctions/priority/selectors';
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
import styles from './index.module.scss';

const History = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(getHistory);
  const taskId = useAppSelector(getTaskId);
  const editTask = useAppSelector(getTask);
  const date = useAppSelector(getInfoDate);
  const priority = useAppSelector(getPriority);
  const countItem = useAppSelector(totalCount);
  const tag = useAppSelector(getTag);
  const loadind = useAppSelector(isLoading);
  const attachments = useAppSelector(getStorageFile);

  const [page, setPage] = useState<number>(2);

  useEffect(() => {
    if (taskId) {
      dispatch(historyAction({ taskId, page: 1 }));
    }
    // eslint-disable-next-line
  }, [attachments, editTask, date, tag, priority]);

  useEffect(() => {
    history.forEach((item) => {
      if (item.params.storage_file) {
        dispatch(
          viewFileHistory({
            fileId: item.params?.storage_file.storage_file_id,
            name: item.params?.storage_file.name_original,
            type: item.params?.storage_file.type,
            size: item.params?.storage_file.size,
          }),
        );
      }
    });
    // eslint-disable-next-line
  }, [history]);

  const onLoadMore = () => {
    setPage(page + 1);

    if (taskId) {
      dispatch(historyAction({ taskId, page }));
    }
  };

  const className = classNames(styles.btn, {
    [styles.btn_not]: history.length >= countItem,
  });

  const objectRef = useRef<any>();
  const width = objectRef.current ? Number(objectRef.current.clientWidth) : 0;

  return (
    <div className={styles.wrapper} ref={objectRef}>
      <div className={styles.wrapperFlex}>
        <img src={historyIcon} alt="history" className={styles.history_text} />
        <p className={styles.text}>Действия</p>
      </div>
      {loadind ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper_item}>
          {history.map((item) => {
            switch (item.command_code) {
              case HISTORY.tagAssign:
              case HISTORY.tagUnassign:
                return (
                  <TagHistory
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.roleAssign:
              case HISTORY.roleUnassign:
                return (
                  <AssignUser
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.dateChange:
                return (
                  <DateTask
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.statusChange:
                return (
                  <Status
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.taskCreate:
                return (
                  <CreateTask
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.titleChange:
                return (
                  <Title
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.fileAssign:
              case HISTORY.fileUnassign:
                return (
                  <Attachments
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.descriptionChange:
                return (
                  <Description
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.checklistUnassign:
              case HISTORY.checklistAssign:
                return (
                  <ChecklistAssign
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.titleChecklistChange:
                return (
                  <ChecklistTitle
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.itemChecklistCreate:
              case HISTORY.itemChecklistComplete:
              case HISTORY.itemChecklistDelete:
                return (
                  <ItemChecklist
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );
              case HISTORY.priorityChange:
                return (
                  <Priority
                    item={item}
                    key={item.history_command_id}
                    width={width}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      )}
      <Button onClick={onLoadMore} className={className}>
        Загрузить еще
      </Button>
    </div>
  );
};

export default React.memo(History);
