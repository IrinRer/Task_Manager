import React from 'react';
import styles from './index.module.scss';

const ChecklistItemPopoverMenu: React.FC = () => {
  return (
    <div>
      <p className={styles.menuOption}>Удалить&nbsp;пункт</p>
    </div>
  );
};

export default ChecklistItemPopoverMenu;
