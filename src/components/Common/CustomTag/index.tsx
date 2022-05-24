import React from 'react';
import { Tag } from 'antd';
import { TagColor } from 'constants/types/common';
import classnames from 'classnames';
import styles from './index.module.scss';

interface IProps {
  title: string;
  color: TagColor | string;
  closable?: boolean;
  noBackground?: boolean;
  id?: string;
  onClose?: (e: any) => void;
}

// CustomTag потому что Tag зарезервировано в antd. wrapper нужен чтобы принять свойство color тэга и фон
const CustomTag: React.FC<IProps> = ({
  title,
  color,
  closable = true,
  noBackground = false,
  id = '',
  onClose = () => {},
}) => {
  const classNames = classnames(
    styles[color],
    noBackground ? styles.noBackground : '',
  );
  return (
    <div className={styles.wrapper}>
      <Tag className={classNames} closable={closable} id={id} onClose={onClose}>
        {title}
      </Tag>
    </div>
  );
};

export default CustomTag;
