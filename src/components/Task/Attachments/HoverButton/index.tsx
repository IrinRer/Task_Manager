import React, { FC } from 'react';
import { Button } from 'antd';
import { CloudDownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycleBin.svg';
import classNames from 'classnames';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';

import styles from './index.module.scss';

interface IProps {
  customPreview?: () => void;
  onDownload: (arg: string) => void;
  onRemove: () => void;
  file: { name?: string; name_original?: string };
  hover: boolean;
  preview?: () => void;
}

const HoverButton: FC<IProps> = ({
  customPreview,
  onDownload,
  onRemove,
  file,
  preview,
  hover,
}) => {
  const isRights = useGetRights(RIGHTS_NAMES.editAttached);

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
        onClick={() => onDownload(file.name || '' || file.name_original || '')}
        className={styles.btn_hover_icon}
      />
      {customPreview && (
        <Button
          icon={<EyeOutlined />}
          onClick={preview || customPreview}
          className={styles.btn_hover_icon}
        />
      )}
    </div>
  );
};

export default HoverButton;
