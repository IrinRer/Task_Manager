import React from 'react';
import { Modal, Button } from 'antd';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import styles from './index.module.scss';
import Notice from '../Notice';

interface IProps {
  textMain: string;
  textButton: string;
  textNotice?: string;
  visible: boolean;
  showNotice?: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleOkNotice?: () => void;
}

const ModalDeleteDelayWithNotice: React.FC<IProps> = (props: IProps) => {
  const {
    textMain,
    textButton,
    textNotice,
    visible,
    showNotice = false,
    handleOk,
    handleCancel,
    handleOkNotice = () => {},
  } = props;

  const submitModal = () => {
    handleOk();
    if (showNotice) {
      Notice({
        text: textNotice || '',
        textButton: 'Отмена',
        className: 'iconDeleteNotice',
        icon: <RecycleBinIcon />,
        handleOk: handleOkNotice,
      });
    }
  };

  return (
    <Modal
      title="Вы уверены?"
      visible={visible}
      width={310}
      className={styles.modalDelete}
      closeIcon={<CloseIcon id="close" />}
      footer={[
        <Button
          className={styles.btn_modal}
          key="submit"
          danger
          type="primary"
          icon={<RecycleBinIcon className={styles.iconDeleteBtn} />}
          onClick={submitModal}
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

export default ModalDeleteDelayWithNotice;
