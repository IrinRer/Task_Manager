import React, { useState } from 'react';
import { RootState, store } from 'store';
import { getVerifyToken } from 'store/auth/token/selectors';

import { Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { createPlaceFile} from 'store/attachments/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getStorageFileId } from 'store/attachments/selectors';
import { api } from 'network';

const Attachments = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getStorageFileId);
  console.log(id);
   
  const onChange = (data) => {
    dispatch(createPlaceFile(data));
  };

  const state: RootState = store.getState();
  const token = getVerifyToken(state);

  const props = {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    action: `https://swimlane-intership-group5.task.dev.tiny-services.ladcloud.ru/api/v1.0/storage/files/b71cc66b-b73c-46e4-a1b6-c9ad3542e3b4/upload`,
    name: 'file'
  };

  return (
    <>
      <h3>Вложения</h3>
      <Upload.Dragger
        multiple
        {...props}
        // action='https://swimlane-intership-group5.task.dev.tiny-services.ladcloud.ru/api/v1.0/storage/files/b71cc66b-b73c-46e4-a1b6-c9ad3542e3b4/upload'  
        listType="picture"
        showUploadList={{ showRemoveIcon: false }}
        beforeUpload={(file) => {
          return true;
        }}
        progress={{
          strokeWidth: 3,
          style: { top: 12 },
        }}
        // customRequest={(e) => console.log(e)}
        // onDrop={onChange}
      >
        <Button>
          <PlusOutlined />
        </Button>
        Перетащите сюда или загрузите файл
      </Upload.Dragger>
      <input type='file' onChange={(e) => onChange(e.target.files)}/>
    </>
  );
};

export default Attachments;
