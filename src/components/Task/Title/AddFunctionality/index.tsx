import React from 'react';
import { Menu, Dropdown } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setClickedAttachments } from 'store/attachments/slice';

const DropMenu = () => {
  const dispatch = useAppDispatch();

  const append = () => {
    dispatch(setClickedAttachments(true));
  };

  const menu = (
    <Menu>
      <Menu.Item>Добавить чеклист</Menu.Item>
      <Menu.Item onClick={append}>Добавить вложение</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <PlusOutlined />
    </Dropdown>
  );
};

export default DropMenu;
