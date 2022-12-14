import React from 'react';
import { Tag } from 'antd';
import { TagColor } from 'constants/types/common';
import classnames from 'classnames';
import { TAGS_INPUT_MAX_LENGTH } from 'constants/common';
import styles from './index.module.scss';

interface IProps {
  title: string;
  color: TagColor;
  closable?: boolean;
  noBackground?: boolean;
  id?: string;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
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
        {title.slice(0, TAGS_INPUT_MAX_LENGTH)}
      </Tag>
    </div>
  );
};

export default CustomTag;
