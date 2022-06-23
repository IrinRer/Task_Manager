import React, { useEffect, useState, useContext } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  cleanRender,
  setImgRecieved,
  setPreviewTitleReceived,
} from 'store/editTask/attachments/preview/slice';
import ModalDelete from 'components/Common/ModalDelete';
import classNames from 'classnames';
import Preview from '../../Preview';
import HoverButton from '../../HoverButton';
import styles from './index.module.scss';
import { ViewFileContext } from '../../context';

const FileImg = () => {
  const dispatch = useAppDispatch();
  const file = useContext(ViewFileContext);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [hover, setHover] = useState(false);

  const url =
    !file.file.url && file.file.originFileObj
      ? URL.createObjectURL(file.file.originFileObj)
      : undefined;

  useEffect(() => {
    dispatch(
      setImgRecieved({ url: url || file.file.url, name: file.file.name || '' }),
    );
    // eslint-disable-next-line
  }, [file.file.url]);

  const isLongText =
    file.file.name && file.file.name?.length > 20
      ? `${file.file.name?.slice(0, 20)}...`
      : file.file.name;

  const customPreview = () => {
    if (file.file.name) {
      setPreviewVisible(true);
      dispatch(setPreviewTitleReceived(file.file.name));
      dispatch(cleanRender());
    }
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
        <img src={file.file.url || url} alt="img" className={classNameImg} />
        <p>{`${isLongText}`} </p>
        <HoverButton
          customPreview={customPreview}
          onRemove={onRemove}
          hover={hover}
        />
      </div>
      <ModalDelete
        textMain={`${file.file.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        file={file.file.name || ''}
        action={file.onDeleteFile}
      />
      <Preview
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
      />
    </>
  );
};

export default FileImg;
