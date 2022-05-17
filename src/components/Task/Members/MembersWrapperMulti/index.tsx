import { CaretRightOutlined } from '@ant-design/icons';
import ListMember from 'components/Task/Info/ListMember';
import React, { FC, RefObject, useRef, useState } from 'react';
import styles from './index.module.scss';

type TProps = {
  roleName: string;
  length: number;
  children: React.ReactNode;
};

const MembersWrapperMulti: FC<TProps> = (props: TProps) => {
  const { roleName, length, children } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const expandChange = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return (
    <div className={styles.infoLine}>
      <span onMouseDownCapture={expandChange} className={styles.expand}>
        {`${roleName} ${length}`}
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      </span>
      {isActive ? (
        <ListMember
          roleName={roleName}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default MembersWrapperMulti;
