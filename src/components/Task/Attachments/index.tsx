import React, { useEffect, useState } from 'react';
import { Button, Upload, Col, notification } from 'antd';
import { PlusOutlined, PaperClipOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { assignFile, viewFile } from 'store/editTask/attachments/thunk';
import { IOptions, ACCEPT_FORMAT } from 'constants/attachments/attachments';
import { getBase64 } from 'helpers/getBase64';
import {
  setImgRecieved,
  setPreviewTitleRender,
} from 'store/editTask/attachments/preview/slice';
import { getTaskFileAllType, getTaskId } from 'store/editTask/selectors';
import {
  getFileName,
  getTaskFileImg,
  getViewFileImg,
} from 'store/editTask/attachments/selectors';
import { config } from 'helpers/progressBar';
import ItemRender from './ItemRender';
import styles from './index.module.scss';
import FileText from './FileText';
import FileImg from './FileImg';
import Preview from './Preview';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);
  const fileName = useAppSelector(getFileName);
  const taskFileImg = useAppSelector(getTaskFileImg);

  const taskFile = useAppSelector(getTaskFileAllType);

  const img = useAppSelector(getViewFileImg);

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

  const [fileList, setFile] = useState<Array<UploadFile>>([]);
  const [progress, setProgress] = useState(0);

  const [previewVisible, setPreviewVisible] = useState(false);

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

  const onViewFileImg = img?.map((item: { name: string; url: string }) => {
    return (
      <FileImg
        key={item.name}
        file={item}
        preview={undefined}
        setFile={setFile}
        fileList={fileList}
      />
    );
  });

  const onViewFileAllType = taskFile?.map((item) => {
    return <FileText file={item} key={item.name_original}/>;
  });

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
        setFile={setFile}
        fileList={fileList}
      />
    );
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewVisible(true);
    dispatch(setImgRecieved({ url: file.url, name: file.name }));
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
        {onViewFileImg}
        {onViewFileAllType}
      </div>
      <Preview
        setFile={setFile}
        fileList={fileList}
        previewVisible={previewVisible}
        onDeleteFile={undefined}
        onDownload={undefined}
        setPreviewVisible={setPreviewVisible}
      />
    </Col>
  );
};

export default Attachments;
