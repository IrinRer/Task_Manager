import React from 'react';
import { Tag } from 'antd';
import styles from './index.module.scss';

interface IProps {
  title: string;
  color: string;
}
// enum TagColors {
//   blue,
//   orange,
//   pink,
//   purple,
//   red,
//   salad,
//   yellow,
// }

// TagWrapper потому что Tag зарезервировано в antd. wrapper нужен чтобы принять свойство color тэга
const TagWrapper: React.FC<IProps> = ({ title, color }) => {
  return (
    <div className={styles.wrapper}>
      <Tag className={styles[color]} closable>
        {title}
      </Tag>
    </div>
  );
};

export default TagWrapper;
