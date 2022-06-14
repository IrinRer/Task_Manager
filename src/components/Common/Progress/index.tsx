import React, {FC} from 'react';
import { Progress } from 'antd';
import { COLOR_PROGRESS } from 'constants/attachments/attachments';

interface IProps {
  progress: number
}

const ProgressBar: FC<IProps> = ({ progress }) => {
  return (
    <Progress
      showInfo={false}
      percent={progress}
      strokeWidth={8}
      strokeColor={{
        '0%': COLOR_PROGRESS,
        '100%': COLOR_PROGRESS,
      }}
      style={{ borderRadius: 8 }}
    />
  );
};

export default ProgressBar;
