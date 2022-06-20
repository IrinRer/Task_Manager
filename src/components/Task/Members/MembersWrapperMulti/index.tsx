import { CaretRightOutlined } from '@ant-design/icons';
import ListMember from 'components/Task/Info/ListMember';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { RoleContext, USERS_BY_ONE_MAX_COUNT } from 'constants/common';
import React, { FC, useContext, useState } from 'react';
import styles from './index.module.scss';

type TProps = {
  children: React.ReactNode;
};

const MembersWrapperMulti: FC<TProps> = ({ children }) => {
  const roleName = useContext(RoleContext);

  const [isActive, setIsActive] = useState<boolean>(false);

  const usersData = useMembersProps(roleName);
  const users = usersData?.users;
  const isManyUsers = users ? users.length > USERS_BY_ONE_MAX_COUNT : false;

  const expandChange = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  return isManyUsers ? (
    <div className={styles.infoLine}>
      <span onMouseDownCapture={expandChange} className={styles.expand}>
        {`${roleName} ${users?.length}`}
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      </span>
      {isActive ? (
        <ListMember isActive={isActive} setIsActive={setIsActive} />
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