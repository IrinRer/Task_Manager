import React, { ReactElement } from 'react';
import { Button, notification } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
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

const Notice = (settings: IProps): void => {
  const {
    text,
    textButton,
    duration = 5,
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

  const btn = (
    <Button
      type="link"
      size="small"
      className={styles.cancelBtn}
      onClick={cancel}
    >
      {textButton}
    </Button>
  );

  const config = {
    message: text,
    duration,
    icon,
    btn,
    key,
    className: `commonNotice ${className}`,
    closeIcon: <CloseIcon id="closeNotify" />,
    onClose: closeNotice,
  };

  notification.open(config);
};

export default Notice;
