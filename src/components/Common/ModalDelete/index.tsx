import React from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { setIsVisibleModalDelete } from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { isModalVisibleDelete } from 'store/editTask/additionalFunctions/tag/modalVisible/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';

import styles from './index.module.scss';


type IProps = {
  textMain: string;
  textButton: string;
  action: (arg: string | UploadFile) => void;
  visibleModalDelete: boolean;
  setIsVisibleModalDelete: (arg: boolean) => void;
  file?: string | UploadFile;
}

const ModalDelete: React.FC<IProps> = ({
  textMain,
  textButton,
  action,
  visibleModalDelete,
  setIsVisibleModalDelete,
  file,
}) => {

  const handleOk = () => {
    if(file) {
      action(file);
    }
    setIsVisibleModalDelete(false);
  };

  const handleCancel = () => {
    setIsVisibleModalDelete(false);
  };

  return (
    <Modal
      title="Вы уверены?"
      visible={visibleModalDelete}
      width={310}
      className={styles.modalTag}
      footer={[
        <Button
          className={styles.btn_modal}
          key="submit"
          danger
          htmlType="submit"
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
