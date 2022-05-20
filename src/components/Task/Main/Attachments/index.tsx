import React, { useState } from 'react';
import { Button, Upload, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { createPlaceFile } from 'store/attachments/thunk';

import styles from './index.module.scss';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<any>([]);
  const [, setProgress] = useState(0);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = (options) => {
    const { onSuccess, onError, onProgress } = options;

    const config = {
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
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
        showUploadList={{ showRemoveIcon: true }}
        beforeUpload={(file) => {
          return true;
        }}
        progress={{
          strokeWidth: 5,
          showInfo: true,
          strokeColor: {
            '0%': '#0062ff',
            '100%': '#0062ff',
          },
          style: { top: 10, borderRadius: 8 },
        }}
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
