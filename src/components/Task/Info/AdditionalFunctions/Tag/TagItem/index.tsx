import React, { useState } from 'react';
import { Tag, Modal, Button, Menu } from 'antd';
import { DeleteOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { uniqueId } from 'lodash';
import { minNumberTagsOnPage } from 'constants/additionalFunctions/tag';

import styles from '../index.module.scss';

const TagItem = ({ tagSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const handleClose = (
    e: React.MouseEvent<HTMLElement>,
    id: string | undefined,
    name: string,
  ) => {
    e.preventDefault();
    setIsVisible(true);
    setId(id);
    setName(name);
  };

  const tag = tagSelect?.map(({ name, color, task_tag_id: id }) => {
    return (
      <Tag
        className={styles.tag}
        color={color}
        closable
        key={name}
        id={id}
        onClose={(e) => handleClose(e, id, name)}
      >
        {name}
      </Tag>
    );
  });

  const handleOk = () => {
    dispatch(deleteTagAction(id));
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Menu mode="vertical" className={styles.menu}>
        <Menu.SubMenu
          key="SubMenu"
          title={`Метка ${tag?.length || ''}`}
          icon={<CaretRightOutlined className={styles.iconColor} />}
        >
          {tag?.map((item: React.ReactElement) => {
            return <Menu.Item key={uniqueId()}>{item}</Menu.Item>;
          })}
        </Menu.SubMenu>
      </Menu>
      <div className={styles.tag}>{tag?.slice(0, minNumberTagsOnPage)}</div>
      <Modal
        title="Вы уверены?"
        visible={isVisible}
        width={310}
        className={styles.modalTag}
        footer={[
          <Button
            className={styles.btn_modal}
            key="submit"
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={handleOk}
          >
            Удалить метку
          </Button>,
          <Button
            key="back"
            className={styles.btn_modal}
            onClick={handleCancel}
          >
            Отмена
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <p>
          Метка {name} будет удалена из списка меток и из всех задач проекта
        </p>
      </Modal>
    </>
  );
};

export default TagItem;
