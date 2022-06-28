import React, { ReactElement } from 'react';
import { Button, notification } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { TIME_SHOW_NOTICE_IN_SECONDS } from 'constants/common';
import styles from './index.module.scss';

interface IProps {
  text: string;
  textButton: string;
  duration?: number;
  className?: string;
  icon?: ReactElement;
  handleOk: () => void;
  handleCancel?: () => void;
}

const notice = (settings: IProps) => {
  const {
    text,
    textButton,
    duration = TIME_SHOW_NOTICE_IN_SECONDS,
    className,
    icon = <InfoCircleOutlined />,
    handleOk,
    handleCancel = () => {},
  } = settings;

  const key = `open${Date.now()}`;

  const cancel = () => {
    handleCancel();
    notification.close(key);
  };

  const closeNotice = () => {
    handleOk();
    notification.close(key);
  };

  const config = {
    message: text,
    duration,
    icon,
    btn: (
      <Button
        type="link"
        size="small"
        className={styles.cancelBtn}
        onClick={cancel}
      >
        {textButton}
      </Button>
    ),
    key,
    className: `commonNotice ${className}`,
    closeIcon: <CloseIcon id="closeNotify" />,
    onClose: closeNotice,
  };

  notification.open(config);
};
export default notice;
