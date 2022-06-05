import React from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import styles from './index.module.scss';

interface IProps {
  textMain: string;
  textButton: string;
  visible: boolean;
  setVisibleModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  action: (arg: string | UploadFile) => void;
  file: string | UploadFile;
}

const ModalDelete: React.FC<IProps> = ({
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
    console.log('onOk ModalDelete');
  };

  const handleCancel = () => {
    setVisibleModalDelete(false);
    console.log('handleCancel ModalDelete');
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
          htmlType='submit'
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

export default ModalDelete;
