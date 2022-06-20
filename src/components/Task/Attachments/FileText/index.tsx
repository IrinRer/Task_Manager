import React, { useState } from 'react';
import shapeAttachment from 'assets/icons/shapeAttachment.svg';
import ModalDelete from 'components/Common/ModalDelete';
import classNames from 'classnames';
import { setHover } from 'store/editTask/attachments/preview/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { getHover } from 'store/editTask/attachments/preview/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import styles from './index.module.scss';
import HoverButton from '../HoverButton';

const FileText = ({ file, onDownload, onDeleteFile }) => {
  const inKB = (+file.size / 1024).toFixed(2);
  const dispatch = useAppDispatch();
  // const hover = useAppSelector(getHover);

  const [hover, setHover] = useState(false);

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const onRemove = () => {
    setVisibleModalDelete(true);
    return false;
  };

  const onHover = () => {
    setHover(true);
  };

  const onBlur = () => {
    setHover(false);
  };

  const classNameWrapper = classNames(styles.wrapper_doc, {
    [styles.wrapper_img_hover]: hover,
  });

  const classNameImg = classNames(styles.wrapper_icon, {
    [styles.img_hover]: hover,
  });

  return (
    <>
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
            file.name || file.name_original
          }`}</p>
          <p className={styles.text_size}>{`${inKB} Kb`}</p>
        </div>
        <HoverButton
          customPreview={undefined}
          onDownload={onDownload}
          onRemove={onRemove}
          file={file}
          hover={hover}
          preview={undefined}
        />
      </div>
      <ModalDelete
        textMain={`${
          file.name_original || file.name
        } будет безвозвратно удален`}
        textButton="Удалить файл"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        file={file.name_original || file.name}
        action={onDeleteFile}
      />
    </>
  );
};

export default FileText;
