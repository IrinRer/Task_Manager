import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';
import { INotifyFile } from 'store/notifications/types';

interface IProps {
  file: INotifyFile;
}

const TaskStorageFileAssign: React.FC<IProps> = ({ file }) => {
  return (
    <>
      <div className="notify-action">
        {NotificationMessageToShow.taskStorageFileAssign}:
      </div>
      <b>{file.name_original}</b>
    </>
  );
};

export default TaskStorageFileAssign;
