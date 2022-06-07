import React, { useState } from 'react';
import { Button } from 'antd';
import { getPriorityName } from 'store/editTask/additionalFunctions/priority/selectors';
import { getDateStop } from 'store/editTask/additionalFunctions/date/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import styles from './index.module.scss';

export const withAdditionalFunctions = <T, P>(
  BaseComponent: React.FC<P>,
  Icon: React.FC,
  value: T,
  accep: T
) => {
  return (props: P) => {
    const [isClick, setClick] = useState(false);
    const priority = useAppSelector(getPriorityName);
    const date = useAppSelector(getDateStop);

    // if(value) {

    // }

    const creatButton = () => {
      setClick(true);
    };

    return (
      <>
        {isClick || value[0] || accep ? (
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
