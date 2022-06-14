import React, { useState } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  cleanRender,
  setPreviewImageReceived,
  setPreviewTitleReceived,
} from 'store/editTask/attachments/preview/slice';
import styles from './index.module.scss';
import Preview from '../Preview';

const FileImg = ({ file, preview, setFile, fileList }) => {
  const dispatch = useAppDispatch();

  const [previewVisible, setPreviewVisible] = useState(false);

  const url = !file.url ? URL.createObjectURL(file.originFileObj) : undefined;

  const isLongText =
    file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name;

  const customPreview = () => {
    setPreviewVisible(true);
    dispatch(setPreviewImageReceived(file.url));
    dispatch(setPreviewTitleReceived(file.name));

    dispatch(cleanRender());
  };

  return (
    <>
      <div className={styles.wrapper_img} onClick={preview || customPreview}>
        <img src={file.url || url} alt="img" className={styles.img} />
        <p>{`${isLongText}`} </p>
      </div>
      <Preview
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
        setFile={setFile}
        fileList={fileList}
        file={file}
      />
    </>
  );
};

export default FileImg;
