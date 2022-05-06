import React from 'react';
import { TRole } from 'constants/types/common';
import { Avatar } from 'antd';
import { AVATAR_TEXT_COLOR } from 'constants/common';
import { avatarColor, initials } from 'helpers/avatarHelper';
import styles from './index.module.scss';

interface IProps {
  role: TRole;
}

const AvatarWrapper: React.FC<IProps> = ({ role }) => {
  const renderRole = (role: TRole): React.ReactElement => {
    if (role.assign_user.logo) {
      // Если есть ссылка на аватар - рендерим аватар
      return <Avatar src={role.assign_user.logo} />;
    }
    if (role.assign_user.name) {
      // Иначе если есть имя - рендерим инициалы со случайным цветом из списка

      return (
        <Avatar
          style={{ color: AVATAR_TEXT_COLOR, backgroundColor: avatarColor() }}
        >
          {initials(role.assign_user.name)}
        </Avatar>
      );
    }
    // Иначе рендерим UU
    return <Avatar>UU</Avatar>;
  };

  return <div className={styles.wrapper}>{renderRole(role)}</div>;
};

export default AvatarWrapper;
