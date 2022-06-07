import React, { useState } from 'react';
import { Button, Upload, Col, notification } from 'antd';
import { PlusOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  assignFile,
  deleteFile,
  downloadFile,
} from 'store/editTask/attachments/thunk';
import {
  IOptions,
  ACCEPT_FORMAT,
  PROGRESS,
} from 'constants/attachments/attachments';
import { getTaskId } from 'store/editTask/selectors';
import { getTaskFile } from 'store/common/task/selectors';
import {
  getfileName,
  getStorageFile,
} from 'store/editTask/attachments/selectors';
import { config } from 'helpers/progressBar';
import { fileFormat } from 'helpers/fileFormat';
import ModalDelete from 'components/Common/ModalDelete';
import styles from './index.module.scss';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const allFileId = useAppSelector(getStorageFile);
  const fileName = useAppSelector(getfileName);
  const taskFile = useAppSelector(getTaskFile);

  const taskFileAll = fileFormat(taskFile);

  // any потому что UploadFile нельзя назначить для taskFileAll, так как
  // taskFileAll я делаю сама. taskFileAll нужен для того, чтобы отображать уже
  // назначенные файлы. Заменить UploadFile на другое тоже не получается, так как
  // это стандартный тип для файлов и есть несовпадение в originFileObj
  const [fileList, setFile] = useState<Array<any>>(taskFileAll);
  const [, setProgress] = useState(0);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [fileForDelete, setfileForDelete] = useState<UploadFile>();

  const determineIndex = (file: UploadFile) => {
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

    const configProgressBar = config(setProgress, onProgress);

    dispatch(
      assignFile({
        fileList: fileList[fileList.length - 1].originFileObj,
        onSuccess,
        onError,
        configProgressBar,
        taskId,
      }),
    );
  };

  return (
    <Col className={styles.col}>
      <div className={styles.wrapperFlex}>
        <PaperClipOutlined className={styles.PaperClipOutlined} />
        <p className={styles.text}>Вложения</p>
      </div>
      <Upload.Dragger
        className={styles.upload}
        fileList={fileList}
        accept={ACCEPT_FORMAT}
        listType="picture"
        progress={PROGRESS}
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
        file={fileForDelete || ''}
        action={onDeleteFile}
      />
    </Col>
  );
};

export default Attachments;
