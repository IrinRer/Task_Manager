import React from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import styles from './index.module.scss';


type IProps = {
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
  };

  const handleCancel = () => {
    setVisibleModalDelete(false);
  };

  return (
    <Modal
      title="Вы уверены?"
      visible={visible}
      width={310}
      zIndex={2000}
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

export default ModalDelete;
