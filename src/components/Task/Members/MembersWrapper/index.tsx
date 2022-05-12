import React, { FC } from 'react';
import styles from './index.module.scss';

type TProps = {
  roleName: string;
  children: React.ReactNode;
};

const MembersWrapper: FC<TProps> = (props: TProps) => {
  const { roleName, children } = props;

  return (
    <div className={styles.infoLine}>
      <span>{roleName}</span>
      {children}
    </div>
  );
};

export default MembersWrapper;
