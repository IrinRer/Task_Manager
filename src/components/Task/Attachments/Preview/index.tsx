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
import ModalDelete from 'components/Common/ModalDelete';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setIndex } from 'store/editTask/attachments/preview/slice';
import Header from './Header';
import ImgView from './ImgView/indes';
import { AttachmentsContext } from '../context';
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

    // eslint-disable-next-line
  }, [imgRecieved, isTitle]);

  const onRemove = () => {
    setVisibleModalDelete(true);
    return false;
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onDeleteFileImg = (nameFile: string) => {
    file.onDeleteFile(nameFile);
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
