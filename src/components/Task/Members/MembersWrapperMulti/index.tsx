import { CaretRightOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import styles from './index.module.scss';

type TProps = {
  roleName: string;
  children: React.ReactNode;
};

const MembersWrapperMulti: FC<TProps> = (props: TProps) => {
  const { roleName, children } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const expandChange = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.infoLine}>
      <span onClick={expandChange}>
        {roleName} <CaretRightOutlined rotate={isActive ? 90 : 0} />
      </span> 
      {isActive ? children : null}
    </div>
  );
};

export default MembersWrapperMulti;
