import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import { CloudDownloadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { AttachmentsContext } from '../../context';

interface IProps {
  previewTitle: string;
  onRemove: () => void;
}

const Header: FC<IProps> = ({ previewTitle, onRemove }) => {
  const file = useContext(AttachmentsContext);

  const isRights = useGetRights(RIGHTS_NAMES.editAttached);

  return (
    <div className={styles.wrapper}>
      <p>{previewTitle}</p>
      <div className={styles.wrapper_btn}>
        {isRights && (
          <Button
            className={styles.btnDeleted}
            icon={<RecycleBinIcon />}
            onClick={onRemove}
          />
        )}
        <Button
          className={styles.btnDownload}
          icon={<CloudDownloadOutlined className={styles.icon} />}
          onClick={() => file.onDownload(previewTitle)}
        />
      </div>
    </div>
  );
};

export default Header;
