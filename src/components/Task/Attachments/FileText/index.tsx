import React from 'react';
import shapeAttachment from 'assets/icons/shapeAttachment.svg';
import styles from './index.module.scss';

const FileText = ({ file }) => {
  const inKB = (+file.size / 1024).toFixed(2);

  return (
    <div className={styles.wrapper_doc}>
      <div className={styles.wrapper_icon}>
        <img src={shapeAttachment} alt="attachmentIcon" />
      </div>
      <div className={styles.wrapper_text}>
        <p className={styles.text_name}>{`${
          file.name || file.name_original
        }`}</p>
        <p className={styles.text_size}>{`${inKB} Kb`}</p>
      </div>
    </div>
  );
};

export default FileText;
