import { Modal } from 'antd';
import React, { useEffect, useState, FC } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getImgReceived,
  getIndex,
  getPreviewTitleReceived,
  getPreviewTitleRender,
} from 'store/editTask/attachments/preview/selectors';
import ModalDelete from 'components/Common/ModalDelete';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setIndex } from 'store/editTask/attachments/preview/slice';
import Header from './Header';
import ImgView from './ImgView/indes';
import styles from './index.module.scss';

interface IProps {
  previewVisible: boolean;
  setPreviewVisible: (arg: boolean) => void;
  onDownload: (arg: string) => void;
  onDeleteFile: (arg: string) => void;
}

const Preview: FC<IProps> = ({
  previewVisible,
  setPreviewVisible,
  onDeleteFile,
  onDownload,
}) => {
  const imgRecieved = useAppSelector(getImgReceived);
  const dispatch = useAppDispatch();
  const previewTitleRender = useAppSelector(getPreviewTitleRender);

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
  }, [imgRecieved, isTitle]);

  const onRemove = () => {
    setVisibleModalDelete(true);
    return false;
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onDeleteFileImg = (nameFile: string) => {
    onDeleteFile(nameFile);
    setPreviewVisible(false);
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
