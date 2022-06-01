import React from 'react';
import { Menu, Dropdown } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setClickedAttachments } from 'store/editTask/attachments/slice';

import styles from './index.module.scss';

const DropMenu = () => {
  const dispatch = useAppDispatch();

  const append = () => {
    dispatch(setClickedAttachments(true));
  };

  const menu = (
    <Menu className={styles.dropdown}>
      <Menu.Item key='1'>Добавить чеклист</Menu.Item>
      <Menu.Item onClick={append} key='2'>Добавить вложение</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} >
      <PlusOutlined />
    </Dropdown>
  );
};

export default DropMenu;
