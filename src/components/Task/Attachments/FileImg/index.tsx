import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getImgReceived } from 'store/editTask/attachments/preview/selectors';
import {
  cleanRender,
  setImgRecieved,
  setPreviewImageReceived,
  setPreviewTitleReceived,
} from 'store/editTask/attachments/preview/slice';
import styles from './index.module.scss';
import Preview from '../Preview';


const FileImg = ({ file, preview, setFile, fileList }) => {
  const dispatch = useAppDispatch();
  const imgRecieved = useAppSelector(getImgReceived);

  const [previewVisible, setPreviewVisible] = useState(false);
  // const [imgRecieved, setImgRecieved] = useState<any>([]);

  useEffect(() => {
    dispatch(setImgRecieved({url: url || file.url, name: file.name}));
  }, [file.url])

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
        img = {imgRecieved}
      />
    </>
  );
};

export default FileImg;
