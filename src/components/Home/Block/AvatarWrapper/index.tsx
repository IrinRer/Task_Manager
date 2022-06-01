import React from 'react';
import { Avatar } from 'antd';
import { AVATAR_TEXT_COLOR } from 'constants/common';
import { avatarColor, initials } from 'helpers/avatarHelper';
import { IUser } from 'store/users/types';
import styles from './index.module.scss';

interface IProps {
  role: IUser;
}

const AvatarWrapper: React.FC<IProps> = ({ role }) => {
  const renderRole = (role: IUser): React.ReactElement => {
    if (role.logo) {
      // Если есть ссылка на аватар - рендерим аватар
      return <Avatar src={role.logo} />;
    }
    if (role.name) {
      // Иначе если есть имя - рендерим инициалы со случайным цветом из списка

      return (
        <Avatar
          style={{ color: AVATAR_TEXT_COLOR, backgroundColor: avatarColor() }}
        >
          {initials(role.name)}
        </Avatar>
      );
    }
    // Иначе рендерим UU
    return <Avatar>UU</Avatar>;
  };

  return <div className={styles.wrapper}>{renderRole(role)}</div>;
};

export default AvatarWrapper;
