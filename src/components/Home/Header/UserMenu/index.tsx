import React from 'react';
import { Select } from 'antd';

import style from './index.module.scss';
import Signout from './Signout';

const UserMenu: React.FC = () => {
  const { Option } = Select;

  return (
    <Select
      className={style.usermenu}
      dropdownMatchSelectWidth={false}
      dropdownClassName={style.dropdown}
      bordered={false}
    >
      {/* <Option key="1">
        <span>Настройки</span>
      </Option> */}
      <Option key="2">
        <Signout title="Выйти" />
      </Option>
    </Select>
  );
};

export default UserMenu;
