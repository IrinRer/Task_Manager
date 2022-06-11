import React from 'react';
import { Progress } from 'antd';
import { COLOR_PROGRESS, PROGRESS } from 'constants/attachments/attachments';

const ProgressBar = ({ progress }) => {
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
