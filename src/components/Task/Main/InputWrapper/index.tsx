import React, { FC } from 'react';
import styles from './index.module.scss';

type TProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  labelText: string;
};

const InputWrapper: FC<TProps> = (props: TProps) => {
  const { icon, children, labelText } = props;

  return (
    <div className={styles.section}>
      {icon}
      <div className={styles.wrapper}>
        {labelText}
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
