import React from 'react';
import { Typography } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { createDateAction } from 'store/editTask/additionalFunctions/date/thunk';
import { DATE_FORMAT_SERVER, DATE_FORMAT_UI } from 'constants/common';
import { format, parse } from 'date-fns';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import DatePicker from 'constants/additionalFunctions/DatePicker';
import { getTaskId } from 'store/editTask/selectors';
import { getDateStop } from 'store/editTask/additionalFunctions/date/selectors';
import { RIGHTS_NAMES } from 'constants/rights';
import { useGetRights } from 'customHooks/useGetRights';
import styles from './index.module.scss';

const { Text } = Typography;

const SelectDate: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const isRights = useGetRights(RIGHTS_NAMES.editTaskDate);
  const acceptDateStop = useAppSelector(getDateStop);

  const onChange = (date: Date | null) => {
    dispatch(
      createDateAction({
        dateStart: date ? format(Date.now(), DATE_FORMAT_SERVER) : null,
        dateStop: date ? format(date, DATE_FORMAT_SERVER) : null,
        task_id: taskId,
      }),
    );
  };

  const isAcceptDateStop = acceptDateStop
    ? parse(acceptDateStop, DATE_FORMAT_UI, new Date())
    : undefined;

  return (
    <div className={styles.date}>
      <Text className={styles.text}>Срок</Text>
      <DatePicker
        defaultValue={isAcceptDateStop || undefined}
        disabled={!isRights}
        format={DATE_FORMAT_UI}
        bordered={false}
        placeholder={isRights ? '+ Добавить срок' : ''}
        className={styles.piker}
        showToday={false}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectDate;
