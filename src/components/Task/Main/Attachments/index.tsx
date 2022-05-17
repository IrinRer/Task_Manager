import React, { useState } from 'react';
import { Button, Upload, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Attachments = () => {

  return (
    <>
      <h3>Вложения</h3>
      <Upload.Dragger
        multiple
        action="https://swimlane-intership-group5.task.dev.tiny-services.ladcloud.ru/api/v1.0/task/tasks/614bd57b-2666-48c2-a91d-3025f42cbe5c/storage-file-assign"
        listType="picture"
        showUploadList={{ showRemoveIcon: false }}

        beforeUpload={(file) => {
          console.log({ file });
          return true;
        }}

        progress={{
            strokeWidth: 3,
            style: {top: 12}
        }}
      >
        <Button>
          <PlusOutlined />
        </Button>
        Перетащите сюда или загрузите файл
      </Upload.Dragger>
    </>
  );
};

export default Attachments;
