import { Modal } from 'antd';
import React, { useEffect, useState, FC } from 'react';
import { CloseCircleOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  getImgReceived,
  getIndex,
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
import { setIndex } from 'store/editTask/attachments/preview/slice';
import Header from './Header';
import ImgView from './ImgView/indes';
import styles from './index.module.scss';

interface IProps {
  setFile: (arg: Array<UploadFile>) => void;
  fileList: Array<UploadFile>;
  previewVisible: boolean;
  setPreviewVisible: (arg: boolean) => void;
  onDownload: any;
  onDeleteFile: any;
}

const Preview: FC<IProps> = ({
  setFile,
  fileList,
  previewVisible,
  setPreviewVisible,
  onDeleteFile,
  onDownload
}) => {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector(getFileName);
  const allFileId = useAppSelector(getStorageFile);
  const taskId = useAppSelector(getTaskId);
  const imgRecieved = useAppSelector(getImgReceived);

  const previewTitleRender = useAppSelector(getPreviewTitleRender);

  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const index = useAppSelector(getIndex);

  // const determineIndex = (nameFile: string) => {
  //   return fileName.indexOf(nameFile);
  // };

  const isTitle = previewTitleRender || previewTitleReceived;

  useEffect(() => {
    imgRecieved.forEach((item, index) => {
      if (item.name === isTitle) {
        dispatch(setIndex(+index));
      }
    });
  }, [imgRecieved, isTitle]);

  const onRemove = () => {
    setVisibleModalDelete(true);
    return false;
  };

  // const onDeleteFile = (nameFile: string) => {
  //   const index = determineIndex(nameFile);
  //   setFile(fileList?.filter((item) => item.name !== nameFile));
  //   dispatch(
  //     deleteFile({
  //       fileId: allFileId[index].storageId,
  //       taskId,
  //       name: nameFile,
  //     }),
  //   );
  //   setPreviewVisible(false);
  // };

  // const onDownload = (nameFile: string) => {
  //   const index = determineIndex(nameFile);
  //   dispatch(
  //     downloadFile({
  //       fileId: allFileId[index].storageId,
  //       name: nameFile,
  //     }),
  //   );
  // };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onDeleteFileImg = (nameFile) => {
    onDeleteFile(nameFile);
    setPreviewVisible(false);
  };

  console.log(onDeleteFile);

  return imgRecieved[index] ? (
    <>
      <Modal
        visible={previewVisible}
        closeIcon={<CloseCircleOutlined />}
        title={
          <Header
            previewTitle={imgRecieved[index].name}
            onRemove={() => onRemove()}
            onDownload={() => onDownload(imgRecieved[index].name)}
          />
        }
        footer={null}
        onCancel={handleCancel}
        className={styles.modal}
      >
        <ImgView />
      </Modal>
      <ModalDelete
        textMain={`${imgRecieved[index]?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        file={imgRecieved[index].name || ''}
        action={onDeleteFileImg}
      />
    </>
  ) : null;
};

export default Preview;
