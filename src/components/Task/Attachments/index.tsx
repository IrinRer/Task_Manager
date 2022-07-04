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
  setImgRecieved,
  setPreviewTitleRender,
} from 'store/editTask/attachments/preview/slice';
import { getTaskId } from 'store/editTask/selectors';
import {
  getFileName,
  getStorageFile,
  getTaskFileImg,
} from 'store/editTask/attachments/selectors';
import { setConfig } from 'helpers/progressBar';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import Preview from './Preview';
import ItemRender from './ItemRender';
import ContextWrapperAttachments from './ContextWrapper';
import ContextWrapperViewFile from './ContextWrapper/ViewFileContex';
import styles from './index.module.scss';
import ViewFileImg from './ViewFileImg';
import ViewFileAllType from './ViewFileAllType';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const fileName = useAppSelector(getFileName);
  const taskFileImg = useAppSelector(getTaskFileImg);
  const allFileId = useAppSelector(getStorageFile);
  const isRights = useGetRights(RIGHTS_NAMES.editAttached);

  useEffect(() => {
    taskFileImg?.forEach(({ storage_file_id, name_original }) =>
      dispatch(
        viewFile({
          fileId: storage_file_id,
          name: name_original,
        }),
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const [fileList, setFile] = useState<Array<any>>([]);
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);

  const beforeUpload = (file: RcFile) => {
    if (fileName.indexOf(file.name) !== -1) {
      notification.error({ message: 'Вы уже добавили этот файл' });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const determineIndex = (nameFile: string) => {
    return fileName.indexOf(nameFile);
  };

  const onDeleteFile = (nameFile: string) => {
    const index = determineIndex(nameFile);
    dispatch(
      deleteFile({
        fileId: allFileId[index].storageId,
        taskId,
        name: nameFile,
      }),
    );
    setPreviewVisible(false);
  };

  const onDownload = (nameFile: string) => {
    const index = determineIndex(nameFile);
    dispatch(
      downloadFile({
        fileId: allFileId[index].storageId,
        name: nameFile,
      }),
    );
  };

  const handleUpload = ({ fileList }) => {
    setFile(fileList);
  };

  const handleSubmit = (options: IOptions) => {
    const { onSuccess, onError, onProgress } = options;

    const configProgressBar = setConfig(setProgress, onProgress);

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
    file: UploadFile,
    fileList: UploadFile[],
    actions: { download: () => void; preview: () => void; remove: () => void },
  ) => {
    return (
      <ContextWrapperViewFile
        file={{
          percent: file.percent,
          type: file.type,
          originFileObj: file.originFileObj,
          name: file.name,
          size: file.size,
        }}
        progress={progress}
        onDeleteFile={onDeleteFile}
        onDownload={onDownload}
        setFile={setFile}
        fileList={fileList}
        preview={actions.preview}
      >
        <ItemRender />
      </ContextWrapperViewFile>
    );
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewVisible(true);
    dispatch(setImgRecieved({ url: file.url, name: file.name }));
    dispatch(setImgRecieved(file));
    dispatch(setPreviewTitleRender(file.name));
  };

  return (
    <ContextWrapperAttachments
      onDeleteFile={onDeleteFile}
      onDownload={onDownload}
      setFile={setFile}
      fileList={fileList}
    >
      <div className={styles.scroll}>
        <Col className={styles.col}>
          <div className={styles.wrapperFlex}>
            <PaperClipOutlined className={styles.PaperClipOutlined} />
            <p className={styles.text}>Вложения</p>
          </div>
          {isRights && (
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
          )}

          <div className={styles.wrapper_all_file}>
            <ViewFileImg />
            <ViewFileAllType />
          </div>
          <Preview
            previewVisible={previewVisible}
            setPreviewVisible={setPreviewVisible}
          />
        </Col>
      </div>
    </ContextWrapperAttachments>
  );
};

export default Attachments;
