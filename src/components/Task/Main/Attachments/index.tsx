import React, { useState } from 'react';
import { Button, Upload, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { createPlaceFile } from 'store/attachments/thunk';
import {
  IFileList,
  IOptions,
  colorProgress,
} from 'constants/types/attachments/attachments';

import styles from './index.module.scss';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<Array<IFileList>>([]);
  const [, setProgress] = useState(0);

  const beforeUpload = () => {
    return true;
  };

  const progress = {
    strokeWidth: 5,
    showInfo: true,
    strokeColor: {
      '0%': colorProgress,
      '100%': colorProgress,
    },
    style: { top: 10, borderRadius: 8 },
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
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
      createPlaceFile({
        fileList: fileList[0].originFileObj,
        onSuccess,
        onError,
        config,
      }),
    );
  };

  return (
    <Col className={styles.col}>
      <p className={styles.text}>Вложения</p>
      <Upload.Dragger
        className={styles.upload}
        multiple
        fileList={fileList}
        listType="picture"
        progress={progress}
        showUploadList={{ showRemoveIcon: true }}
        beforeUpload={beforeUpload}
        customRequest={handleSubmit}
        onChange={handleUpload}
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
