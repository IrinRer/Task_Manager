import React from 'react';
import { Button } from 'antd';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import { CloudDownloadOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const Header = ({ previewTitle, onRemove, onDownload }) => {
  return (
    <div className={styles.wrapper}>
      <p>{previewTitle}</p>
      <div className={styles.wrapper_btn}>
        <Button
          className={styles.btnDeleted}
          icon={<RecycleBinIcon />}
          onClick={onRemove}
        />
        <Button
          className={styles.btnDownload}
          icon={<CloudDownloadOutlined className={styles.icon} />}
          onClick={onDownload}
        />
      </div>
    </div>
  );
};

export default Header;
