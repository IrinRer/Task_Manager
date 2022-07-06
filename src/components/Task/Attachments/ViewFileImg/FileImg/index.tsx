import React, { useEffect, useState, useContext } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  cleanRender,
  setImgRecieved,
  setPreviewTitleReceived,
} from 'store/editTask/attachments/preview/slice';
import ModalDeleteDelayWithNotice from 'components/Common/ModalDeleteDelayWithNotice';
import { ATTACHMENTS_TITLE_MAX_LENGTH } from 'constants/attachments/attachments';
import { setAssignFileToDelete } from 'store/editTask/attachments/slice';
import classNames from 'classnames';
import Preview from '../../Preview';
import { ViewFileContext } from '../../Context/contextViewFile';
import HoverButton from '../../HoverButton';
import styles from './index.module.scss';

const FileImg = () => {
  const dispatch = useAppDispatch();
  const valueContext = useContext(ViewFileContext);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [hover, setHover] = useState(false);

  const url =
    !valueContext.file.url && valueContext.file.originFileObj
      ? URL.createObjectURL(valueContext.file.originFileObj)
      : undefined;

  useEffect(() => {
    dispatch(
      setImgRecieved({
        url: url || valueContext.file.url,
        name: valueContext.file.name || '',
      }),
    );
    // eslint-disable-next-line
  }, [valueContext.file.url]);

  const isLongText =
    valueContext.file.name &&
    valueContext.file.name?.length > ATTACHMENTS_TITLE_MAX_LENGTH
      ? `${valueContext.file.name?.slice(0, ATTACHMENTS_TITLE_MAX_LENGTH)}...`
      : valueContext.file.name;

  const customPreview = () => {
    if (valueContext.file.name) {
      setPreviewVisible(true);
      dispatch(setPreviewTitleReceived(valueContext.file.name));
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

  const handleOkDelete = () => {
    setVisibleModalDelete(false);
    if(valueContext.file.name) {
      dispatch(setAssignFileToDelete(valueContext.file.name));

      valueContext.setFile(
        valueContext.fileList?.filter(
          (item) => item.name !== valueContext.file.name,
        ),
      );
    }
  };

  const handleCancelDelete = () => {
    setVisibleModalDelete(false);
    dispatch(setAssignFileToDelete(''));
    valueContext.setFile(valueContext.fileList);
  };

  const handleCancel = () => {
    setVisibleModalDelete(false);
  };

  const onDelete = () => {
    if(valueContext.file.name) {
      valueContext.onDeleteFile(valueContext.file.name);
    }
  };

  const classNameWrapper = classNames(styles.wrapper_img, {
    [styles.wrapper_img_hover]: hover,
  });

  const classNameImg = classNames(styles.img, {
    [styles.img_hover]: hover,
  });

  return (
    <>
      {valueContext.file.name ? (
        <div
          onMouseEnter={onHover}
          onMouseLeave={onBlur}
          className={classNameWrapper}
        >
          <img
            src={valueContext.file.url || url}
            alt="img"
            className={classNameImg}
          />
          <p>{`${isLongText}`} </p>
          <HoverButton
            customPreview={customPreview}
            onRemove={onRemove}
            hover={hover}
          />
        </div>
      ) : null}

      <ModalDeleteDelayWithNotice
        visible={visibleModalDelete}
        textMain={`Файл ${valueContext.file.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        textNotice="Файл удален"
        handleOk={handleOkDelete}
        handleCancel={handleCancel}
        handleOkNotice={onDelete}
        handleCancelNotify={handleCancelDelete}
        showNotice
      />
      <Preview
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
      />
    </>
  );
};

export default FileImg;
