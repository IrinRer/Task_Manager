import React from 'react';
import { Button } from 'antd';
import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import classNames from 'classnames';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getFileName,
  getStorageFile,
} from 'store/editTask/attachments/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { getHover } from 'store/editTask/attachments/preview/selectors';

import styles from './index.module.scss';

const HoverButton = ({
  customPreview,
  onDownload,
  onRemove,
  file,
  preview,
  hover
}) => {
//   const hover = useAppSelector(getHover);

  const classNameBtn = classNames(styles.not_hover_icon, {
    [styles.hover_icon]: hover,
  });

  //   const determineIndex = (nameFile: string) => {
  //     return fileName.indexOf(nameFile);
  //   };

  //   const onDeleteFile = (nameFile: string) => {
  //     const index = determineIndex(nameFile);
  //     setFile(fileList?.filter((item) => item.name !== nameFile));
  //     dispatch(
  //       deleteFile({
  //         fileId: allFileId[index].storageId,
  //         taskId,
  //         name: nameFile,
  //       }),
  //     );
  //     setPreviewVisible(false);
  //   };

  //   const onDownload = (nameFile: string) => {
  //     const index = determineIndex(nameFile);
  //     dispatch(
  //       downloadFile({
  //         fileId: allFileId[index].storageId,
  //         name: nameFile,
  //       }),
  //     );
  //   };

  return (
    <div className={classNameBtn}>
      <Button
        icon={<RecycleBinIcon />}
        onClick={onRemove}
        className={styles.btn_hover_icon}
      />
      <Button
        icon={<CloudDownloadOutlined />}
        onClick={() => onDownload(file.name || file.name_original)}
        className={styles.btn_hover_icon}
      />
      {customPreview && (
        <Button
          icon={<EyeOutlined />}
          onClick={preview || customPreview}
          className={styles.btn_hover_icon}
        />
      )}
    </div>
  );
};

export default HoverButton;
