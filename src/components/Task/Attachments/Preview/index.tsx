import { Modal, Carousel, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  CloseCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  getImgReceived,
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

const Preview = ({ setFile, fileList, previewVisible, setPreviewVisible }) => {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector(getFileName);
  const allFileId = useAppSelector(getStorageFile);
  const taskId = useAppSelector(getTaskId);
  const imgRecieved = useAppSelector(getImgReceived);

  const previewTitleRender = useAppSelector(getPreviewTitleRender);
  // const previewImageRender = useAppSelector(getPreviewImageRender);

  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);
  // const previewImageReceived = useAppSelector(getPreviewImageReceived);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [index, setIndex] = useState(0);

  const determineIndex = (file: UploadFile) => {
    return fileName.indexOf(file?.originFileObj?.name || file.name);
  };

  // const isImg = previewImageRender || previewImageReceived;
  const isTitle = previewTitleRender || previewTitleReceived;

  useEffect(() => {
    imgRecieved.forEach((item, index) => {
      if (item.name === isTitle) {
        setIndex(+index);
      }
    });
  }, [imgRecieved, isTitle]);

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

  const handleClick = (i: string) => {
    setIndex(+i);
  };

  const prevClick = () => {
    return index !== 0 ? setIndex(index - 1) : setIndex(imgRecieved.length - 1);
  };

  const nextClick = () => {
    return index !== imgRecieved.length - 1 ? setIndex(index + 1) : setIndex(0);
  };

  return imgRecieved.length ? (
    <>
      <Modal
        visible={previewVisible}
        closeIcon={<CloseCircleOutlined />}
        title={
          <Header
            previewTitle={imgRecieved[index].name}
            onRemove={() => onRemove()}
            onDownload={() => onDownload(imgRecieved[index].file)}
          />
        }
        footer={null}
        onCancel={handleCancel}
        className={styles.modal}
      >
        <img alt="img" className={styles.img} src={imgRecieved[index].url} />

        <Button icon={<LeftOutlined />} onClick={prevClick} />
        <Button icon={<RightOutlined />} onClick={nextClick} />

        {imgRecieved.map((item, i) => {
          return imgRecieved[index].url !== item.url ? (
            <div style={{ width: '100px' }} onClick={() => handleClick(i)}>
              <img src={item.url} alt="img" style={{ width: '100px' }} />
            </div>
          ) : null;
        })}
      </Modal>
      <ModalDelete
        textMain={`${imgRecieved[index]?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        file={imgRecieved[index].file || ''}
        action={onDeleteFile}
      />
    </>
  ) : null;
};

export default Preview;
