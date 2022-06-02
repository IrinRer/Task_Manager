import React from 'react';
import { Avatar } from 'antd';
import { AVATAR_TEXT_COLOR } from 'constants/common';
import { getAvatarColor, initials } from 'helpers/avatarHelper';
import { IUser } from 'store/users/types';
import styles from './index.module.scss';

interface IProps {
  user: IUser | undefined;
}

const UserAvatar: React.FC<IProps> = ({ user }) => {
  if (!user) return null;
  // Если есть ссылка на аватар - рендерим аватар
  if (user.logo) return <Avatar className={styles.avatar} src={user.logo} />;
  // Иначе если есть имя - рендерим инициалы со случайным цветом из списка
  if (user.name) {
    return (
      <Avatar
        className={styles.avatar}
        style={{
          color: AVATAR_TEXT_COLOR,
          backgroundColor: getAvatarColor(),
        }}
      >
        {initials(user.name)}
      </Avatar>
    );
  }
  // Иначе рендерим UU
  return <Avatar className={styles.avatar}>UU</Avatar>;
};

export default UserAvatar;
