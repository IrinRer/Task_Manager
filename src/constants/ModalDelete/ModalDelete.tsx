import React from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const ModalDelete = ({
  textMain,
  textButton,
  visible,
  setVisibleModalDelete,
  action,
  file,
}) => {
  const handleOk = () => {
    action(file);
    setVisibleModalDelete(false);
  };

  const handleCancel = () => {
    setVisibleModalDelete(false);
  };

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
      <p>{textMain}</p>
    </Modal>
  );
};