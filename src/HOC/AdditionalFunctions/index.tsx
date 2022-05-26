import React, { useState } from 'react';
import { Button } from 'antd';
import { ITag } from 'store/common/tags/types';
import styles from './index.module.scss';

interface IProps {
  dateStop?: string;
  tagSelect?: TPropsTag;
  defaultPriority?: string;
}

type TPropsTag = ITag[] | null | undefined;

export const withAdditionalFunctions = (
  BaseComponent: React.FC<IProps>,
  Icon: React.FC,
  value: TPropsTag | string,
) => {
  return (props: IProps) => {
    const [isClick, setClick] = useState(false);

    const creatButton = () => {
      setClick(true);
    };

    return (
      <>
        {isClick || ( value && value.length !== 0)? (
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
