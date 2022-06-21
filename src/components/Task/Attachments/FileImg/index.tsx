import React, { useEffect, useState, FC } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  cleanRender,
  setImgRecieved,
  setPreviewTitleReceived,
} from 'store/editTask/attachments/preview/slice';
import { RcFile } from 'antd/lib/upload';
import ModalDelete from 'components/Common/ModalDelete';
import classNames from 'classnames';
import Preview from '../Preview';
import HoverButton from '../HoverButton';
import styles from './index.module.scss';

interface IProps {
  file: { url: string; name: string; originFileObj?: RcFile };
  preview?: () => void;
  onDownload: (arg: string) => void;
  onDeleteFile: (arg: string) => void;
}

const FileImg: FC<IProps> = ({ file, preview, onDownload, onDeleteFile }) => {
  const dispatch = useAppDispatch();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [hover, setHover] = useState(false);

  const url =
    !file.url && file.originFileObj
      ? URL.createObjectURL(file.originFileObj)
      : undefined;

  useEffect(() => {
    dispatch(setImgRecieved({ url: url || file.url, name: file.name }));
  }, [file.url]);

  const isLongText =
    file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name;

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
        <p>{`${isLongText}`} </p>
        <HoverButton
          customPreview={customPreview}
          onDownload={onDownload}
          onRemove={onRemove}
          file={file}
          hover={hover}
          preview={preview}
        />
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
        onDeleteFile={onDeleteFile}
        onDownload={onDownload}
      />
    </>
  );
};

export default FileImg;
