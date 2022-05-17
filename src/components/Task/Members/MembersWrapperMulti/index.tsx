import { CaretRightOutlined } from '@ant-design/icons';
import ListMember from 'components/Task/Info/ListMember';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import React, { FC, useState } from 'react';
import styles from './index.module.scss';

type TProps = {
  roleName: string;
  children: React.ReactNode;
};

const MembersWrapperMulti: FC<TProps> = (props: TProps) => {
  const { roleName, children } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const usersData = useMembersProps(roleName);
  const users = usersData?.users;
  const isManyUsers = Array.isArray(users) && users ? users.length > 3 : false;

  const expandChange = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return isManyUsers && Array.isArray(users) ? (
    <div className={styles.infoLine}>
      <span onMouseDownCapture={expandChange} className={styles.expand}>
        {`${roleName} ${users?.length}`}
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
  ) : (
    <div className={styles.infoLine}>
      <span>{roleName}</span>
      {children}
    </div>
  );
};

export default MembersWrapperMulti;
