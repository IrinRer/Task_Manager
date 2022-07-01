import React, { useState, useContext } from 'react';
import shapeAttachment from 'assets/icons/shapeAttachment.svg';
import ModalDelete from 'components/Common/ModalDelete';
import classNames from 'classnames';
import HoverButton from '../../HoverButton';
import { ViewFileContext } from '../../Context/contextViewFile';
import styles from './index.module.scss';

const FileText = () => {
  const valueContext = useContext(ViewFileContext);
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
      <ModalDelete
        textMain={`${
          valueContext.file.name_original || valueContext.file.name
        } будет безвозвратно удален`}
        textButton="Удалить файл"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        target={valueContext.file.name_original || valueContext.file.name}
        action={valueContext.onDeleteFile}
      />
    </>
  );
};

export default FileText;
