import React, { useState } from 'react';
import { Button, Upload, Col, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
// import type {UploadRequestOption} from 'rc-upload/lib/interface';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  assignFile,
  deleteFile,
  downloadFile,
} from 'store/editTask/attachments/thunk';
import {
  IOptions,
  acceptFormat,
  progress,
} from 'constants/types/attachments/attachments';
import { IPayloadFile } from 'store/editTask/attachments/types';
import { uniqueId } from 'lodash';
import { getTaskId } from 'store/editTask/selectors';
import { getTaskFile } from 'store/common/task/selectors';
import {
  getfileName,
  getStorageFile,
} from 'store/editTask/attachments/selectors';
import ModalDelete from '../../../../constants/ModalDelete';
import styles from './index.module.scss';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const allFileId = useAppSelector(getStorageFile);
  const fileName = useAppSelector(getfileName);
  const taskFile = useAppSelector(getTaskFile);

  const taskFileAll = taskFile.map((item: IPayloadFile) => {
    // формат в котором вложения поступают с бэка и формат вложений
    // при загрузки разный, поэтому приходится приводить к одному виду
    return {
      uid: uniqueId(),
      name: item.name_original,
      originFileObj: {
        name: item.name_original,
      },
      size: item.size,
      type: item.content_type,
      thumbUrl: item.image_thumbnail,
      storageId: item.storage_file_id,
      response: 'Ok',
      status: 'done',
    };
  });

  const [fileList, setFile] = useState<Array<UploadFile>>(taskFileAll);
  const [, setProgress] = useState(0);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [fileForDelete, setfileForDelete] = useState<UploadFile>();

  const determineIndex = (file: UploadFile) => {
    // определяется индекс вложения, потом по этому индексу будет удаляться
    // или скачиваться
    return fileName.indexOf(file?.originFileObj?.name || '');
  };

  const beforeUpload = (file: RcFile) => {
    if (fileName.indexOf(file.name) !== -1) {
      notification.error({ message: 'Вы уже добавили этот файл' });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleUpload = ({ fileList }) => {
    setFile(fileList);
  };

  const onRemove = (file: UploadFile) => {
    setVisibleModalDelete(true);
    setfileForDelete(file);
    return false;
  };

  const onDeleteFile = (file: UploadFile) => {
    const index = determineIndex(file);
    setFile(fileList?.filter((item) => item.name !== file.name));
    dispatch(
      deleteFile({
        fileId: allFileId[index].storageId,
        taskId,
        name: file?.originFileObj?.name,
      }),
    );
  };

  const onDownload = (file: UploadFile) => {
    const index = determineIndex(file);
    dispatch(
      downloadFile({
        fileId: allFileId[index].storageId,
        name: file?.originFileObj?.name,
      }),
    );
  };

  const handleSubmit = (options: IOptions) => {
    const { onSuccess, onError, onProgress } = options;

    // config нужен для того, чтобы отображался progress bar загрузки файла
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
        <Button className={styles.btnAttachment}>
          <PlusOutlined />
        </Button>
        Перетащите сюда или загрузите файл
      </Upload.Dragger>
      <ModalDelete
        visible={visibleModalDelete}
        textMain={`${fileForDelete?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        setVisibleModalDelete={setVisibleModalDelete}
        file={fileForDelete}
        action={onDeleteFile}
      />
    </Col>
  );
};

export default Attachments;
