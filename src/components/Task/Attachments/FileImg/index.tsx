import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  cleanRender,
  setHover,
  setImgRecieved,
  setPreviewTitleReceived,
} from 'store/editTask/attachments/preview/slice';
import { deleteFile, downloadFile } from 'store/editTask/attachments/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getFileName,
  getStorageFile,
} from 'store/editTask/attachments/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { Button } from 'antd';
import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import ModalDelete from 'components/Common/ModalDelete';
import { getHover } from 'store/editTask/attachments/preview/selectors';
import classNames from 'classnames';
import styles from './index.module.scss';
import Preview from '../Preview';
import HoverButton from '../HoverButton';


interface IProps {
  file: any;
  preview?: () => void;
  setFile: Dispatch<SetStateAction<UploadFile[]>>;
  fileList: Array<UploadFile>;
}

const FileImg: FC<any> = ({
  file,
  preview,
  setFile,
  fileList,
  onDownload,
  onDeleteFile,
}) => {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector(getFileName);
  const allFileId = useAppSelector(getStorageFile);
  const taskId = useAppSelector(getTaskId);
  
  // const hover = useAppSelector(getHover);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [hover, setHover] = useState(false);
  // const [hover, setHover] = useState(false);

  const url =
    !file.url && file.originFileObj
      ? URL.createObjectURL(file.originFileObj)
      : undefined;

  useEffect(() => {
    dispatch(setImgRecieved({ url: url || file.url, name: file.name }));
  }, [dispatch, file]);

  const isLongText =
    file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name;

  const determineIndex = (nameFile: string) => {
    return fileName.indexOf(nameFile);
  };

  const customPreview = () => {
    setPreviewVisible(true);
    dispatch(setPreviewTitleReceived(file.name));
    dispatch(cleanRender());
  };

  const onHover = () => {
    setHover(true);
  };

  const onBlur = () => {
    setHover(false);
  };

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

  const classNameBtn = classNames(styles.not_hover_icon, {
    [styles.hover_icon]: hover,
  });

  const classNameWrapper = classNames(styles.wrapper_img, {
    [styles.wrapper_img_hover]: hover,
  });

  const classNameImg = classNames(styles.img, {
    [styles.img_hover]: hover,
  });

  return (
    <>
      <div
        onMouseEnter={onHover}
        onMouseLeave={onBlur}
        className={classNameWrapper}
      >
        <img src={file.url || url} alt="img" className={classNameImg} />
        <HoverButton
          customPreview={customPreview}
          onDownload={onDownload}
          onRemove={onRemove}
          file={file}
          hover={hover}
          preview={preview}
        />
        <p>{`${isLongText}`} </p>
      </div>
      <ModalDelete
        textMain={`${file.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        file={file.name || ''}
        action={onDeleteFile}
      />
      <Preview
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
        setFile={setFile}
        fileList={fileList}
        onDeleteFile={onDeleteFile}
        onDownload={onDownload}
      />
    </>
  );
};

export default FileImg;
