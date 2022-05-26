import React, { useState } from 'react';
import { Button } from 'antd';

import styles from './index.module.scss';

export const withAdditionalFunctions = (
  BaseComponent: React.FC,
  Icon: React.FC,
) => {
  return () => {
    const [isClick, setClick] = useState(false);

    const creatButton = () => {
      setClick(true);
    };

    return (
      <>
        {isClick ? (
          <BaseComponent />
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
