import React, { FC } from 'react';
import { Menu } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { uniqueId } from 'lodash';
import { MIN_NUMBER_TAGS_ON_PAGE } from 'constants/additionalFunctions/tag';
import { unassignTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { ITag } from 'store/common/tags/types';
import CustomTag from 'components/Common/CustomTag';
import styles from '../index.module.scss';

type TProps = {
  editable: boolean;
  tagSelect?: ITag[];
  taskId: string | undefined;
};

const TagItem: FC<TProps> = ({ editable, tagSelect, taskId }) => {
  const dispatch = useAppDispatch();

  const handleClose = (id: string | undefined, name: string) => {
    dispatch(unassignTagAction({ tagId: id, taskId, name }));
  };

  const tag = tagSelect?.map(({ name, color, task_tag_id: id }) => {
    return (
      <CustomTag
        title={name}
        color={color}
        closable={editable}
        key={name}
        id={id}
        onClose={() => handleClose(id, name)}
      />
    );
  });

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
    </>
  );
};

export default TagItem;
