import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

export const withAdditionalFunctions = <T, P>(
  BaseComponent: React.FC<P>,
  Icon: React.FC,
  value: T,
) => {
  return (props: P) => {
    const [isClick, setClick] = useState(false);

    const creatButton = () => {
      setClick(true);
    };

    return (
      <>
        {isClick || value[0] ? (
          <BaseComponent {...props} />
        ) : (
          <Button
            icon={<Icon />}
            onClick={creatButton}
            className={styles.btn}
          />
        )}
      </>
    );
  };
};
