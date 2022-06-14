import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface IProps {
  textMain: string;
  textButton: string;
  visible: boolean;
  time?: number;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalDeleteDelay: React.FC<IProps> = (props: IProps) => {
  const {
    textMain,
    textButton,
    visible,
    time = 5,
    handleOk,
    handleCancel,
  } = props;

  const [secondsToGo, setSecondsToGo] = useState<number>(time);

  useEffect(() => {
    if (visible) {
      const timer = setInterval(() => {
        setSecondsToGo(secondsToGo - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }

    setSecondsToGo(time);
    return undefined;
  }, [secondsToGo, time, visible]);

  useEffect(() => {
    if (visible && secondsToGo <= 0) {
      handleOk();
    }
    return undefined;
  }, [handleOk, secondsToGo, visible]);

  return (
    <Modal
      title="Вы уверены?"
      visible={visible}
      width={310}
      className={styles.modalTag}
      footer={[
        <Button
          className={styles.btn_modal}
          key="submit"
          danger
          type="primary"
          icon={<DeleteOutlined />}
          onClick={handleOk}
        >
          {textButton}
        </Button>,
        <Button key="back" className={styles.btn_modal} onClick={handleCancel}>
          Отмена
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <p>{textMain.replace('N', secondsToGo.toString())}</p>
    </Modal>
  );
};

export default ModalDeleteDelay;
