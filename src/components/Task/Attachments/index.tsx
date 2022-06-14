import React, { useEffect, useState } from 'react';
import { Button, Upload, Col, notification } from 'antd';
import { PlusOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import {
  assignFile,
  deleteFile,
  downloadFile,
  viewFile,
} from 'store/editTask/attachments/thunk';
import { IOptions, ACCEPT_FORMAT } from 'constants/attachments/attachments';
import { getBase64 } from 'helpers/getBase64';
import {
  setPreviewImageRender,
  setPreviewTitleRender,
  setPreviewVisibleReceived,
} from 'store/editTask/attachments/preview/slice';
import { getTaskId } from 'store/editTask/selectors';
import {
  getFileName,
  getStorageFile,
  getTaskFileAllType,
  getTaskFileImg,
  getViewFile,
} from 'store/editTask/attachments/selectors';
import { config } from 'helpers/progressBar';
import ModalDelete from 'components/Common/ModalDelete';
import ItemRender from './ItemRender';
import styles from './index.module.scss';
import FileText from './FileText';
import FileImg from './FileImg';
import Preview from './Preview';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const allFileId = useAppSelector(getStorageFile);
  const fileName = useAppSelector(getFileName);
  const taskFileImg = useAppSelector(getTaskFileImg);

  const taskFile = useAppSelector(getTaskFileAllType);

  const img = useAppSelector(getViewFile);

  useEffect(() => {
    taskFileImg?.map(({ storage_file_id, name_original }) =>
      dispatch(
        viewFile({
          fileId: storage_file_id,
          name: name_original,
        }),
      ),
    );
  }, [dispatch]);

  const [fileList, setFile] = useState<Array<UploadFile>>([]); // точно тут
  const [progress, setProgress] = useState(0); // точно тут
  const [visibleModalDelete, setVisibleModalDelete] = useState(false); // это в другой ветке
  const [fileForDelete, setFileForDelete] = useState<UploadFile>();

  const [previewVisible, setPreviewVisible] = useState(false);
  // const [previewVisibleReceived, setPreviewVisibleReceived] = useState();

  const determineIndex = (file: UploadFile) => {
    return fileName.indexOf(file?.originFileObj?.name || file.name);
  };

  const beforeUpload = (file: RcFile) => {
    if (fileName.indexOf(file.name) !== -1) {
      notification.error({ message: 'Вы уже добавили этот файл' });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleUpload = ({ fileList }) => {
    setFile(fileList);
  };

  const onRemove = (file: UploadFile) => {
    setVisibleModalDelete(true);
    setFileForDelete(file);
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
    dispatch(setPreviewVisibleReceived(false));
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

  const onViewFileImg = () => {
    return img?.map((item: RcFile) => {
      return (
        <FileImg
          file={item}
          preview=""
          onDownload={onDownload}
          onRemove={onRemove}
        />
      );
    });
  };

  const onViewFileAllType = () => {
    return taskFile?.map((item) => {
      return <FileText file={item} />;
    });
  };

  const handleSubmit = (options: IOptions) => {
    const { onSuccess, onError, onProgress } = options;

    const configProgressBar = config(setProgress, onProgress);

    dispatch(
      assignFile({
        fileList: fileList[fileList.length - 1].originFileObj,
        onSuccess,
        onError,
        configProgressBar,
        taskId,
      }),
    );
  };

  const itemListRender = (
    _,
    file: RcFile,
    fileList: UploadFile[],
    actions: { download: () => void; preview: () => void; remove: () => void },
  ) => {
    return (
      <ItemRender
        file={file}
        progress={progress}
        preview={actions.preview}
        onDownload={onDownload}
        onRemove={onRemove}
      />
    );
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setFileForDelete(file);
    dispatch(setPreviewImageRender(file.url || (file.preview as string)));
    setPreviewVisible(true);
    dispatch(setPreviewTitleRender(file.name));
  };

  return (
    <Col className={styles.col}>
      <div className={styles.wrapperFlex}>
        <PaperClipOutlined className={styles.PaperClipOutlined} />
        <p className={styles.text}>Вложения</p>
      </div>
      <Upload.Dragger
        className={styles.upload}
        fileList={fileList}
        accept={ACCEPT_FORMAT}
        itemRender={itemListRender}
        beforeUpload={beforeUpload}
        customRequest={handleSubmit}
        onChange={handleUpload}
        onPreview={handlePreview}
      >
        <Button className={styles.btnAttachment}>
          <PlusOutlined />
        </Button>
        Перетащите сюда или загрузите файл
      </Upload.Dragger>
      <div className={styles.wrapper_all_file}>
        {onViewFileImg()}
        {onViewFileAllType()}
      </div>
      <ModalDelete
        visible={visibleModalDelete}
        textMain={`${fileForDelete?.name} будет безвозвратно удален`}
        textButton="Удалить файл"
        setVisibleModalDelete={setVisibleModalDelete}
        file={fileForDelete || ''}
        action={onDeleteFile}
      />
      <Preview
        file={fileForDelete}
        onDownload={onDownload}
        onRemove={onRemove}
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
      />
    </Col>
  );
};

export default Attachments;
