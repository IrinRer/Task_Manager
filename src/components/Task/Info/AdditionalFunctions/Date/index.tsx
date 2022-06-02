import React from 'react';
import { Typography } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { createDateAction } from 'store/editTask/additionalFunctions/date/thunk';
import { DATE_FORMAT_SERVER, DATE_FORMAT_UI } from 'constants/common';
import { format, parse } from 'date-fns';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import DatePicker from 'constants/additionalFunctions/DatePicker';
import { getTaskInfoDateStop } from 'store/common/task/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

const { Text } = Typography;

const SelectDate = () => {
  const dispatch = useAppDispatch();

  const dateStop = useAppSelector(getTaskInfoDateStop);
  const taskId = useAppSelector(getTaskId);
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editTaskDate);

  const onChange = (date: Date | null) => {
    dispatch(
      createDateAction({
        // если date выбрана, то в dateStart пойдет сегодняшняя отформатированная дата,
        // если нет, то отправляется null

        // dateStart и dateStop отправляются вместе, так как в thunk идут два запроса.
        // Начальная дата (dateStart) должна отправляться первой, иначе ошибка
        dateStart: date ? format(Date.now(), DATE_FORMAT_SERVER) : null,
        dateStop: date ? format(date, DATE_FORMAT_SERVER) : null,
        task_id: taskId,
      }),
    );
  };

  return (
    <div className={styles.date}>
      <Text className={styles.text}>Срок</Text>
      <DatePicker
        defaultValue={
          dateStop ? parse(dateStop, DATE_FORMAT_UI, new Date()) : undefined
        }
        disabled={!isRights}
        format={DATE_FORMAT_UI}
        bordered={false}
        placeholder="+ Добавить срок"
        className={styles.piker}
        showToday={false}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectDate;
