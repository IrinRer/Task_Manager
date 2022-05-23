import React, { useState } from 'react';
import { Button, Upload, Col, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { assignFile, deleteFile, downloadFile } from 'store/attachments/thunk';
import {
  IOptions,
  colorProgress,
  acceptFormat,
} from 'constants/types/attachments/attachments';
import { getTaskId } from 'store/editTask/selectors';
import { getfileName, getStorageFile } from 'store/attachments/selectors';
import styles from './index.module.scss';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const allFile = useAppSelector(getStorageFile);
  const fileName = useAppSelector(getfileName);

  const [fileList, setFile] = useState<Array<UploadFile>>([]);
  const [, setProgress] = useState(0);

  const determineIndex = (file: UploadFile) => {
    return fileName.indexOf(file?.originFileObj?.name || '')
  }

   const beforeUpload = (file: RcFile) => {
    if (fileName.indexOf(file.name) !== -1) {
      notification.error({ message: 'Вы уже добавили этот файл' });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const progress = {
    strokeWidth: 5,
    showInfo: false,
    strokeColor: {
      '0%': colorProgress,
      '100%': colorProgress,
    },
    style: { top: 10, borderRadius: 8 },
  };

  const handleUpload = ({ fileList }) => {
    setFile(fileList);
  };

  const onRemove = (file: UploadFile) => {
    const index = determineIndex(file);
    dispatch(
      deleteFile({
        fileId: allFile[index].storageId,
        taskId,
        name: file?.originFileObj?.name,
      }),
    );
  };

  const onDownload = (file: UploadFile) => {
    const index = determineIndex(file); 
    dispatch(
      downloadFile({
        fileId: allFile[index].storageId,
        name: file?.originFileObj?.name,
      }),
    );
  };

  const handleSubmit = (options: IOptions) => {
    const { onSuccess, onError, onProgress } = options;

    const config = {
      onUploadProgress: (event: ProgressEvent) => {
        const definePercent = (event.loaded / event.total) * 100;
        const percent = Math.floor(definePercent);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: definePercent });
      },
    };

    dispatch(
      assignFile({
        // последний файл в fileList новый, его и отпправляю
        fileList: fileList[fileList.length - 1].originFileObj,
        onSuccess,
        onError,
        config,
        taskId,
      }),
    );
  };

  return (
    <Col className={styles.col}>
      <p className={styles.text}>Вложения</p>
      <Upload.Dragger
        className={styles.upload}
        fileList={fileList}
        accept={acceptFormat}
        listType="picture"
        progress={progress}
        showUploadList={{ showRemoveIcon: true, showDownloadIcon: true }}
        beforeUpload={beforeUpload}
        customRequest={handleSubmit}
        onChange={handleUpload}
        onRemove={onRemove}
        onDownload={onDownload}
      >
        <Button className={styles.btn}>
          <PlusOutlined />
        </Button>
        Перетащите сюда или загрузите файл
      </Upload.Dragger>
    </Col>
  );
};

export default Attachments;
