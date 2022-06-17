import { Modal, Carousel, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  CloseCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  getFileRender,
  getPreviewImageReceived,
  getPreviewImageRender,
  getPreviewTitleReceived,
  getPreviewTitleRender,
} from 'store/editTask/attachments/preview/selectors';
import { setFileRender } from 'store/editTask/attachments/preview/slice';
import { setIsVisibleModalDelete } from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import ModalDelete from 'components/Common/ModalDelete';
import { UploadFile } from 'antd/lib/upload/interface';
import {
  getFileName,
  getStorageFile,
} from 'store/editTask/attachments/selectors';
import { deleteFile, downloadFile } from 'store/editTask/attachments/thunk';
import { getTaskId } from 'store/editTask/selectors';
import Header from './Header';
import styles from './index.module.scss';

const Preview = ({
  file,
  setFile,
  fileList,
  previewVisible,
  setPreviewVisible,
  img,
}) => {
  const dispatch = useAppDispatch();
  const fileName = useAppSelector(getFileName);
  const allFileId = useAppSelector(getStorageFile);
  const taskId = useAppSelector(getTaskId);
  const fileRender = useAppSelector(getFileRender);

  const previewTitleRender = useAppSelector(getPreviewTitleRender);
  const previewImageRender = useAppSelector(getPreviewImageRender);

  const previewTitleReceived = useAppSelector(getPreviewTitleReceived);
  const previewImageReceived = useAppSelector(getPreviewImageReceived);
  const isTitle = previewTitleRender || previewTitleReceived;

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  // const [fileRender, setFileRender] = useState<any>([]);
  const [title, setTitle] = useState<any>(isTitle);
  // const [smth, setSmth] = useState<any>();
  const [index, setIndex] = useState(0);

  const determineIndex = (file: UploadFile) => {
    return fileName.indexOf(file?.originFileObj?.name || file.name);
  };

  const isImg = previewImageRender || previewImageReceived;

  useEffect(() => {
    img.forEach((item, index) => {
      if (item.url === isImg) {
        setIndex(+index);
      }
    });
  }, [img, isImg]);

  const onRemove = () => {
    dispatch(setIsVisibleModalDelete(true));
    return false;
  };

  const onDeleteFile = (file: UploadFile) => {
    const index = determineIndex(file);
    setFile(fileList?.filter((item) => item.name !== file.name));
    dispatch(
      deleteFile({
        fileId: allFileId[index].storageId,
        taskId,
        name: file?.originFileObj?.name || file.name,
      }),
    );
    setPreviewVisible(false);
  };

  const onDownload = (file: UploadFile) => {
    const index = determineIndex(file);
    dispatch(
      downloadFile({
        fileId: allFileId[index].storageId,
        name: file?.originFileObj?.name,
      }),
    );
  };

  const onChange = (current: number) => {
    console.log(current);
    return img.map((item, index) => {
      if (current === index) {
        return item.name;
      }
      return title;
    });
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  // сделать красиво как нибудь
  // const imgAll = () => {
  //   if (img) {
  //     return img.map(({ url, name }) => {
  //       if (url !== isImg) {
  //         // dispatch(setFileRender({ url, name }));
  //         return (
  //           <div>
  //             <img src={url} alt="img" className={styles.img} />
  //           </div>
  //         );
  //       }
  //       return null;
  //     });
  //   }
  //   return null;
  // };

  const imgAll = () => {
    if (img) {
      return img.map(({ url, name }) => {
        // dispatch(setFileRender({ url, name }));
        return (
          <div>
            <img src={url} alt="img" className={styles.img} />
          </div>
        );
      });
    }
    return null;
  };

  // const index = img.map((item, index) => item.url === isImg ? index : null);
  // в итоге вернется индекс того изображения которое есть сейчас

  const prevClick = () => {
    return index !== 0 ? setIndex(index - 1) : setIndex(img.length - 1);
  };

  const nextClick = () => {
    return index !== img.length - 1 ? setIndex(index + 1) : setIndex(0);
  };

  // const ff = img ? img[0].url : null;

  return (
    <>
      {img.length ? (
        <Modal
          visible={previewVisible}
          closeIcon={<CloseCircleOutlined />}
          title={
            <Header
              previewTitle={img[index].name}
              onRemove={() => onRemove()}
              onDownload={() => onDownload(file)}
            />
          }
          footer={null}
          onCancel={handleCancel}
          className={styles.modal}
        >
          {/* <div >
            <img alt="img" className={styles.img} src={isImg}/>
        </div> */}

          <img alt="img" className={styles.img} src={img[index].url} />

          <Button icon={<LeftOutlined />} onClick={prevClick} />
          <Button icon={<RightOutlined />} onClick={nextClick} />
          {/* <Carousel
          afterChange={onChange}
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          <div >
            <img alt="img" className={styles.img} src={isImg}/>
          </div>
          {imgAll()}
        </Carousel> */}
        </Modal>
      ) : null}
      <ModalDelete
        textMain={`${file?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        file={file || ''}
        action={onDeleteFile}
      />
    </>
  );
};

export default Preview;
