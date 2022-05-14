import { CaretRightOutlined } from '@ant-design/icons';
import ListMember from 'components/Task/Info/ListMember';
import React, { FC, useState } from 'react';
import styles from './index.module.scss';

type TProps = {
  roleName: string;
  length: number;
  children: React.ReactNode;
};

const MembersWrapperMulti: FC<TProps> = (props: TProps) => {
  const { roleName, length, children } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const expandChange = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.infoLine}>
      <span onClick={expandChange}>
        {`${roleName} ${length}`}
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      </span>
      {isActive ? <ListMember roleName={roleName} /> : children}
    </div>
  );
};

export default MembersWrapperMulti;
