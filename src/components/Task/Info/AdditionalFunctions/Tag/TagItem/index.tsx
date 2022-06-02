import React, { useState } from 'react';
import { Tag, Menu } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { deleteTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { uniqueId } from 'lodash';
import { MIN_NUMBER_TAGS_ON_PAGE } from 'constants/additionalFunctions/tag';
import ModalDelete from 'components/Common/ModalDelete';
import { ITag } from 'store/common/tags/types';

import styles from '../index.module.scss';

interface IProps {
  tagSelect?: ITag[];
}

const TagItem: React.FC<IProps> = ({ tagSelect }) => {
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
      <div className={styles.tag}>{tag?.slice(0, MIN_NUMBER_TAGS_ON_PAGE)}</div>
      <ModalDelete
        visible={isVisible}
        textMain={`Метка ${name} будет удалена из списка меток и из всех задач проекта`}
        textButton="Удалить метку"
        setVisibleModalDelete={setIsVisible}
        file={id}
        action={handleOk}
      />
    </>
  );
};

export default TagItem;
