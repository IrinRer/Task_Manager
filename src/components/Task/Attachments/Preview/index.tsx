import { Modal } from 'antd';
import React, { useEffect, useState, FC, useContext } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getImgReceived,
  getIndex,
  getPreviewTitleReceived,
  getPreviewTitleRender,
} from 'store/editTask/attachments/preview/selectors';
import ModalDeleteDelayWithNotice from 'components/Common/ModalDeleteDelayWithNotice';
import { setAssignFileToDelete } from 'store/editTask/attachments/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setIndex } from 'store/editTask/attachments/preview/slice';
import Header from './Header';
import ImgView from './ImgView/indes';
import { AttachmentsContext } from '../Context/contextAttachments';
import styles from './index.module.scss';

interface IProps {
  previewVisible: boolean;
  setPreviewVisible: (arg: boolean) => void;
}

const Preview: FC<IProps> = ({ previewVisible, setPreviewVisible }) => {
  const imgRecieved = useAppSelector(getImgReceived);
  const dispatch = useAppDispatch();
  const previewTitleRender = useAppSelector(getPreviewTitleRender);
  const file = useContext(AttachmentsContext);

  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const index = useAppSelector(getIndex);

  const isTitle = previewTitleRender || previewTitleReceived;

  useEffect(() => {
    imgRecieved.forEach((item, index) => {
      if (item.name === isTitle) {
        dispatch(setIndex(+index));
      }
    });
  }, [dispatch, imgRecieved, isTitle]);

  const onRemove = () => {
    setVisibleModalDelete(true);
    return false;
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onDelete = () => {
    if (imgRecieved[index].name) {
      file.onDeleteFile(imgRecieved[index]?.name);
    }
    setPreviewVisible(false);
  };

  const handleOkDelete = () => {
    setVisibleModalDelete(false);
    if (imgRecieved[index]?.name && file.fileList) {
      dispatch(setAssignFileToDelete(imgRecieved[index]?.name));
      file.setFile(
        file.fileList.filter((item) => item.name !== imgRecieved[index].name),
      );
    }
  };

  const handleCancelDelete = () => {
    setVisibleModalDelete(false);
    dispatch(setAssignFileToDelete(''));
    if (file.fileList) {
      file.setFile(file.fileList);
    }
  };

  return imgRecieved[index] ? (
    <>
      <Modal
        visible={previewVisible}
        closeIcon={<CloseCircleOutlined />}
        title={
          <Header
            previewTitle={imgRecieved[index].name}
            onRemove={() => onRemove()}
          />
        }
        footer={null}
        onCancel={handleCancel}
        className={styles.modal}
      >
        <ImgView />
      </Modal>
      <ModalDeleteDelayWithNotice
        visible={visibleModalDelete}
        textMain={`${imgRecieved[index]?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        textNotice="Файл удален"
        handleOk={handleOkDelete}
        handleCancel={handleCancel}
        handleOkNotice={onDelete}
        handleCancelNotify={handleCancelDelete}
        showNotice
      />
    </>
  ) : null;
};

export default Preview;
