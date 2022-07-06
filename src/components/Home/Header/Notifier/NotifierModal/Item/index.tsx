import React from 'react';
import Body from './Body';
import Icon from './Icon';
import styles from './index.module.scss';

const Item = () => {
  return (
    <div className={styles.item}>
      <div>
        <Icon />
      </div>
      <Body />
    </div>
  );
};

export default Item;
