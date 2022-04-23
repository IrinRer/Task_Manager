import React, { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { userRemoved } from 'store/filters/slice';
import { IUser } from 'store/users/types';
import { fetchTasksAction } from 'store/tasks/thunk';
import styles from './index.module.scss';

interface IParticipantTagProps {
  participant: IUser;
}

const ParticipantTag: FC<IParticipantTagProps> = ({ participant }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(userRemoved(participant));
    dispatch(fetchTasksAction());
  };

  return (
    <div className={styles.tag}>
      <p className={styles.text}>{participant.name}</p>
      <button className={styles.button} type="button" onClick={handleClose}>
        <CloseOutlined className={styles.icon} />
      </button>
    </div>
  );
};

export default ParticipantTag;
