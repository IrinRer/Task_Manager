import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

interface IProps {
  isVisible: boolean;
  setIsVisible: (boolean) => void;
  selfClosing: boolean;
  children: React.ReactNode;
}

const MessageModal: React.FC<IProps> = ({
  isVisible,
  setIsVisible,
  selfClosing,
  children,
}) => {
  const [activate, setActivate] = useState(false);
  const classNames = classnames(styles.modal, activate ? styles.active : '');

  useEffect(() => {
    if (selfClosing && isVisible) {
      setActivate(true);
      // console.log('START COUNTDOWN');
      setTimeout(() => {
        // console.log('isVisible False');
        setActivate(false);
        setTimeout(() => setIsVisible(false), 400);
      }, 5000);
    }
    // eslint-disable-next-line
  }, [isVisible]);

  return (
    <div className={classNames} onClick={() => setIsVisible(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header с кнопкой закрытия */}
        <header>
          <span
            onClick={() => {
              setIsVisible(false);
            }}
          >
            &times;
          </span>
        </header>

        {/* Основной контент */}
        <main>{children}</main>

        {/* Бегущая полоска */}
        <footer />
      </div>
    </div>
  );
};

export default MessageModal;
