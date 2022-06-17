import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

export const withAdditionalFunctions = <T, P>(
  BaseComponent: React.FC,
  Icon: React.FC,
  value: T,
  accepted: T,
) => {
  return (props: P) => {
    const [isClick, setClick] = useState(false);

    const creatButton = () => {
      setClick(true);
    };

    return (
      <>
        {isClick || value[0] || accepted[0] ? (
          <BaseComponent  />
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
