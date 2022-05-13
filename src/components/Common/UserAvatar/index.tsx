import React from 'react';
import { Avatar } from 'antd';
import { AVATAR_TEXT_COLOR } from 'constants/common';
import { avatarColor, initials } from 'helpers/avatarHelper';
import { IUser } from 'store/users/types';
import styles from './index.module.scss';

interface IProps {
  user: IUser | undefined;
}

// переделать чтоб принимал user_id?

const UserAvatar: React.FC<IProps> = ({ user }) => {
  const renderLogo = (logo: string): React.ReactElement => {
    if (logo) {
      // Если есть ссылка на аватар - рендерим аватар
      return <Avatar src={logo} />;
    }
    if (user?.name) {
      // Иначе если есть имя - рендерим инициалы со случайным цветом из списка

      return (
        <Avatar
          style={{ color: AVATAR_TEXT_COLOR, backgroundColor: avatarColor() }}
        >
          {initials(user.name)}
        </Avatar>
      );
    }
    // Иначе рендерим UU
    return <Avatar>UU</Avatar>;
  };

  return user ? (
    <div className={styles.wrapper}>{renderLogo(user.logo)}</div>
  ) : null;
};

export default UserAvatar;
