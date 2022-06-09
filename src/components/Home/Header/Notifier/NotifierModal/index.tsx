import { Modal } from 'antd';
import React from 'react';
import Header from './Header';
import styles from './index.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifierModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <div className={styles.modal}>
      <Modal visible={isOpen} onCancel={onClose} /* onOk={handleOk}  */>
        <Header />
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default NotifierModal;
