import React, { useState, useContext } from 'react';
import shapeAttachment from 'assets/icons/shapeAttachment.svg';
import ModalDeleteDelayWithNotice from 'components/Common/ModalDeleteDelayWithNotice';
import classNames from 'classnames';
import { setAssignFileToDelete } from 'store/editTask/attachments/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import HoverButton from '../../HoverButton';
import { ViewFileContext } from '../../Context/contextViewFile';
import styles from './index.module.scss';

const FileText = () => {
  const valueContext = useContext(ViewFileContext);
  const dispatch = useAppDispatch();
  const inKB = valueContext.file?.size
    ? (valueContext.file.size / 1024).toFixed(2)
    : null;

  const [hover, setHover] = useState(false);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const onRemove = () => {
    setVisibleModalDelete(true);
  };

  const onHover = () => {
    setHover(true);
  };

  const onBlur = () => {
    setHover(false);
  };

  const handleOkDelete = () => {
    const name =
      valueContext.file.name_original || valueContext.file.name || '';

    setVisibleModalDelete(false);
    dispatch(setAssignFileToDelete(name));

    valueContext.setFile(
      valueContext.fileList?.filter((item) => item.name !== name),
    );
  };

  const handleCancelDelete = () => {
    setVisibleModalDelete(false);
    dispatch(setAssignFileToDelete(''));
  };

  const handleCancel = () => {
    setVisibleModalDelete(false);
  };

  const onDelete = () => {
    valueContext.onDeleteFile(
      valueContext.file.name_original || valueContext.file.name || '',
    );
  };

  const classNameWrapper = classNames(styles.wrapper_doc, {
    [styles.wrapper_img_hover]: hover,
  });

  const classNameImg = classNames(styles.wrapper_icon, {
    [styles.img_hover]: hover,
  });

  return (
    <>
      {valueContext.file.name || valueContext.file.name_original ? (
        <div
          onMouseEnter={onHover}
          onMouseLeave={onBlur}
          className={classNameWrapper}
        >
          <div className={classNameImg}>
            <img src={shapeAttachment} alt="attachmentIcon" />
          </div>
          <div className={styles.wrapper_text}>
            <p className={styles.text_name}>{`${
              valueContext.file.name || valueContext.file.name_original
            }`}</p>
            <p className={styles.text_size}>{`${inKB} Kb`}</p>
          </div>
          <HoverButton
            customPreview={undefined}
            onRemove={onRemove}
            hover={hover}
          />
        </div>
      ) : null}
      <ModalDeleteDelayWithNotice
        visible={visibleModalDelete}
        textMain={`Файл ${
          valueContext.file.name_original || valueContext.file.name
        } будет безвозвратно удален`}
        textButton="Удалить файл"
        textNotice="Файл удален"
        handleOk={handleOkDelete}
        handleCancel={handleCancel}
        handleOkNotice={onDelete}
        handleCancelNotify={handleCancelDelete}
        showNotice
      />
    </>
  );
};

export default FileText;
