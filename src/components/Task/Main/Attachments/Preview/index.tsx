import React from 'react';
import { Modal } from 'antd';
import styles from './index.module.scss';

const Preview = ({ visible, previewTitle, image, setPreviewVisible }) => {
  const handleCancel = () => setPreviewVisible(false);

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      title={previewTitle}
    >
      <img alt={previewTitle} className={styles.preview} src={image} />
    </Modal>
  );
};

export default Preview;
