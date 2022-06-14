import { Modal } from 'antd';
import React, { useMemo } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  getPreviewImageReceived,
  getPreviewImageRender,
  getPreviewTitleReceived,
  getPreviewTitleRender,
} from 'store/editTask/attachments/preview/selectors';
import { setPreviewVisibleReceived } from 'store/editTask/attachments/preview/slice';

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

  console.log('Preview')

  const handleCancel = () => {
    setPreviewVisible(false)
    dispatch(setPreviewVisibleReceived(false));
  };

  const previewTitleRender = useAppSelector(getPreviewTitleRender);
  const previewImageRender = useAppSelector(getPreviewImageRender);
  // const fileRender = useAppSelector(getPreviewFileRender);

  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);
  const previewImageReceived = useAppSelector(getPreviewImageReceived);
  // const fileReceived = useAppSelector(getPreviewFileReceived)

  return (
    <Modal
      visible={previewVisible}
      closeIcon={<CloseCircleOutlined />}
      title={
        <Header
          previewTitle={previewTitleRender || previewTitleReceived}
          onRemove={() => onRemove(file)}
          onDownload={() => onDownload(file)}
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
