import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.module.scss';
import Info from './Info';
import Main from './Main';

const Task: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    const a = '';
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>

      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={styles.task}
        footer={[]}
      >
        <div className={styles.taskContainer}>
          <Main />
          <Info />
        </div>
        <Button
          className={styles.save}
          loading={confirmLoading}
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </Modal>
    </>
  );
};

export default Task;
