import React, { FC, useState } from 'react';
import { Menu } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { uniqueId } from 'lodash';
import { MIN_NUMBER_TAGS_ON_PAGE } from 'constants/additionalFunctions/tag';
import ModalDelete from 'components/Common/ModalDelete';
import { deleteTagAction } from 'store/common/tags/thunk';
import { ITag } from 'store/common/tags/types';
import CustomTag from 'components/Common/CustomTag';
import styles from '../index.module.scss';

type TProps = {
  editable: boolean;
  tagSelect?: ITag[];
};

const TagItem: FC<TProps> = ({ editable, tagSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState<string | undefined>('');

  const dispatch = useAppDispatch();

  const handleClose = (
    id: string | undefined,
    name: string,
  ) => {
    setIsVisible(true);
    setId(id);
    setName(name);
  };

  const tag = tagSelect?.map(({ name, color, task_tag_id: id }) => {
    return (
      <CustomTag
        title={name}
        color={color}
        closable={editable}
        key={name}
        id={id}
        onClose={(e) => handleClose(id, name)}
      />
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
        file={id || ''}
        action={handleOk}
      />
    </>
  );
};

export default TagItem;
