import React from 'react';
import { Modal } from 'antd';

const Preview = ({ visible, previewTitle, image, setPreviewVisible }) => {
  const handleCancel = () => setPreviewVisible(false);

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      title={previewTitle}
    >
      <img alt={previewTitle} style={{ width: '100%' }} src={image} />
    </Modal>
  );
};

export default Preview;
