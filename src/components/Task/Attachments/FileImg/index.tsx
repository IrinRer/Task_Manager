import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
// import {
//   setPreviewImage,
//   setPreviewTitle,
//   setPreviewVisible,
// } from 'store/editTask/attachments/preview/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getPreviewVisibleReceived } from 'store/editTask/attachments/preview/selectors';
import {
  setPreviewFileReceived,
  setPreviewImageReceived,
  setPreviewImageRender,
  setPreviewTitleReceived,
  setPreviewTitleRender,
  setPreviewVisibleReceived,
  setPreviewVisibleRender,
} from 'store/editTask/attachments/preview/slice';
import styles from './index.module.scss';
import Preview from '../Preview';


const FileImg = ({ file, preview, onRemove, onDownload }) => {
  const dispatch = useAppDispatch();
  const previewVisibleReceived = useAppSelector(getPreviewVisibleReceived)

  const [previewVisible, setPreviewVisible] = useState(previewVisibleReceived);

  const url = !file.url ? URL.createObjectURL(file.originFileObj) : undefined;

  const isLongText =
    file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name;

  const customPreview = () => {
    // dispatch(setPreviewVisibleReceived(true));
    setPreviewVisible(true);
    dispatch(setPreviewImageReceived(file.url));
    dispatch(setPreviewTitleReceived(file.name));
    dispatch(setPreviewFileReceived(file));

    dispatch(setPreviewImageRender(''));
    dispatch(setPreviewTitleRender(''));
  };

  return (
    <>
      <div className={styles.wrapper_img} onClick={preview || customPreview}>
        <img src={file.url || url} alt="img" className={styles.img} />
        <p>{`${isLongText}`} </p>
      </div>
      <Preview
        // previewTitle={file.name}
        previewVisible={previewVisible}
        // previewImage={file.url}
        setPreviewVisible={setPreviewVisible}
        onRemove={onRemove}
        onDownload={onDownload}
        file={file}
      />
    </>
  );
};

export default FileImg;
