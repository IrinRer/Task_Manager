import { IPayloadFile } from 'store/editTask/attachments/types';
import uniqueId from 'lodash/uniqueId';

export const fileFormat = (taskFile: IPayloadFile[] | undefined) => {
    return taskFile?.length 
    ? taskFile?.map((item: IPayloadFile) => {
        // формат в котором вложения поступают с бэка и формат вложений
        // при загрузки разный, поэтому приходится приводить к одному виду
        return {
          uid: uniqueId(),
          name: item.name_original,
          originFileObj: {
            name: item.name_original,
          },
          size: item.size,
          type: item.content_type,
          storageId: item.storage_file_id,
          response: 'Ok',
          status: 'done',
        };
      })
    : [];
}