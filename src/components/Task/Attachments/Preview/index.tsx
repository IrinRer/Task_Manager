import { Modal } from 'antd';
import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  getPreviewFileReceived,
  getPreviewFileRender,
  getPreviewImageReceived,
  getPreviewImageRender,
  getPreviewTitleReceived,
  getPreviewTitleRender,
  getPreviewVisibleReceived,
  getPreviewVisibleRender,
} from 'store/editTask/attachments/preview/selectors';
import {
  setPreviewVisibleReceived,
  setPreviewVisibleRender,
} from 'store/editTask/attachments/preview/slice';
import Header from './Header';
import styles from './index.module.scss';

const Preview = ({
  onRemove,
  onDownload,
  file,
  // previewTitle,
  // previewImage,
   previewVisible,
  setPreviewVisible
}) => {
  const dispatch = useAppDispatch();

  const fileReceived = useAppSelector(getPreviewFileReceived);

  const handleCancel = () => {
    setPreviewVisible(false)
    // dispatch(setPreviewVisibleReceived(false));
  };

  const previewTitleRender = useAppSelector(getPreviewTitleRender);
  const previewImageRender = useAppSelector(getPreviewImageRender);
  // const fileRender = useAppSelector(getPreviewFileRender);


  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);
  const previewImageReceived = useAppSelector(getPreviewImageReceived);
  // const fileReceived = useAppSelector(getPreviewFileReceived);

  console.log(previewTitleRender)
  console.log(previewTitleReceived)
  console.log(file)

  return (
    <Modal
      visible={previewVisible}
      closeIcon={<CloseCircleOutlined />}
      title={
        <Header
          previewTitle={previewTitleRender || previewTitleReceived}
          onRemove={() => onRemove(file || fileReceived)}
          onDownload={() => onDownload(file || fileReceived)}
        />
      }
      footer={null}
      onCancel={handleCancel}
      className={styles.modal}
    >
      <img alt="img" className={styles.img} src={previewImageRender || previewImageReceived} />
    </Modal>
  );
};

export default Preview;
