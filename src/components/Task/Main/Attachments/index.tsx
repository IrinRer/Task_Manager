import React, { useState } from 'react';
import { Button, Upload, Col, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
// import type {UploadRequestOption} from 'rc-upload/lib/interface';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { assignFile, deleteFile, downloadFile } from 'store/attachments/thunk';
import {
  IOptions,
  acceptFormat,
  progress,
} from 'constants/types/attachments/attachments';
import { IPayloadFile } from 'store/attachments/types';
import { uniqueId } from 'lodash';
import { getTaskId } from 'store/editTask/selectors';
import { getTaskFile } from 'store/common/task/selectors';
import { getfileName, getStorageFile } from 'store/attachments/selectors';
import Preview from './Preview';
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
    const id = uniqueId();
    return {
      uid: id,
      name: item.name_original,
      originFileObj: {
        name: item.name_original,
        uid: id,
        size: item.size,
        type: item.content_type,
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
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
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
        // последний файл в fileList новый, его и отпправляю
        fileList: fileList[fileList.length - 1].originFileObj,
        onSuccess,
        onError,
        config,
        taskId,
      }),
    );
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
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
        onRemove={(file) => {
          setVisibleModalDelete(true);
          setfileForDelete(file);
          return false;
        }}
        onDownload={onDownload}
        onPreview={handlePreview}
      >
        <Button className={styles.btnAttachment}>
          <PlusOutlined />
        </Button>
        Перетащите сюда или загрузите файл
      </Upload.Dragger>
      <Preview
        visible={previewVisible}
        previewTitle={previewTitle}
        image={previewImage}
        setPreviewVisible={setPreviewVisible}
      />
      <ModalDelete
        visible={visibleModalDelete}
        textMain="Файл будет удален из задачи"
        textButton="Удалить файл"
        setVisibleModalDelete={setVisibleModalDelete}
        file={fileForDelete}
        action={onRemove}
      />
    </Col>
  );
};

export default Attachments;
