import { Modal } from 'antd';
import React, {useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  getPreviewImageReceived,
  getPreviewImageRender,
  getPreviewTitleReceived,
  getPreviewTitleRender,
} from 'store/editTask/attachments/preview/selectors';

import ModalDelete from 'components/Common/ModalDelete';
import { UploadFile } from 'antd/lib/upload/interface';
import {
  getFileName,
  getStorageFile,
} from 'store/editTask/attachments/selectors';
import { deleteFile, downloadFile } from 'store/editTask/attachments/thunk';
import { getTaskId } from 'store/editTask/selectors';
import Header from './Header';
import styles from './index.module.scss';

const Preview = ({
  file,
  setFile,
  fileList,
  previewVisible,
  setPreviewVisible,
}) => {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector(getFileName);
  const allFileId = useAppSelector(getStorageFile);
  const taskId = useAppSelector(getTaskId);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const determineIndex = (file: UploadFile) => {
    return fileName.indexOf(file?.originFileObj?.name || file.name);
  };

  const onRemove = () => {
    setVisibleModalDelete(true);
    return false;
  };

  const onDeleteFile = (file: UploadFile) => {
    const index = determineIndex(file);
    setFile(fileList?.filter((item) => item.name !== file.name));
    dispatch(
      deleteFile({
        fileId: allFileId[index].storageId,
        taskId,
        name: file?.originFileObj?.name || file.name,
      }),
    );
    setPreviewVisible(false);
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

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const previewTitleRender = useAppSelector(getPreviewTitleRender);
  const previewImageRender = useAppSelector(getPreviewImageRender);

  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);
  const previewImageReceived = useAppSelector(getPreviewImageReceived);

  return (
    <>
      <Modal
        visible={previewVisible}
        closeIcon={<CloseCircleOutlined />}
        title={
          <Header
            previewTitle={previewTitleRender || previewTitleReceived}
            onRemove={() => onRemove()}
            onDownload={() => onDownload(file)}
          />
        }
        footer={null}
        onCancel={handleCancel}
        className={styles.modal}
      >
        <img
          alt="img"
          className={styles.img}
          src={previewImageRender || previewImageReceived}
        />
      </Modal>
      <ModalDelete
        visible={visibleModalDelete}
        textMain={`${file?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        setVisibleModalDelete={setVisibleModalDelete}
        file={file || ''}
        action={onDeleteFile}
      />
    </>
  );
};

export default Preview;
