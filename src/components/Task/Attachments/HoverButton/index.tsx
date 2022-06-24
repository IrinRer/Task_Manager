import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import classNames from 'classnames';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';

import styles from './index.module.scss';
import { ViewFileContext } from '../context';

interface IProps {
  customPreview?: () => void;
  onRemove: () => void;
  hover: boolean;
}

const HoverButton: FC<IProps> = ({ customPreview, onRemove, hover }) => {
  const isRights = useGetRights(RIGHTS_NAMES.editAttached);
  const file = useContext(ViewFileContext);

  const classNameBtn = classNames(styles.not_hover_icon, {
    [styles.hover_icon]: hover,
  });

  return (
    <div className={classNameBtn}>
      {isRights && (
        <Button
          icon={<RecycleBinIcon />}
          onClick={onRemove}
          className={styles.btn_hover_icon}
        />
      )}
      <Button
        icon={<CloudDownloadOutlined />}
        onClick={() =>
          file.onDownload(file.file.name ||  file.file.name_original || '')
        }
        className={styles.btn_hover_icon}
      />
      {customPreview && (
        <Button
          icon={<EyeOutlined />}
          onClick={file.preview || customPreview}
          className={styles.btn_hover_icon}
        />
      )}
    </div>
  );
};

export default HoverButton;
