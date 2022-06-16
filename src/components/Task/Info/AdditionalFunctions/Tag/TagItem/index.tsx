import React, { FC } from 'react';
import { Menu } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { MIN_NUMBER_TAGS_ON_PAGE } from 'constants/additionalFunctions/tag';
import { unassignTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTag } from 'store/editTask/additionalFunctions/tag/selectors';
import CustomTag from 'components/Common/CustomTag';
import styles from '../index.module.scss';

type TProps = {
  editable: boolean;
  taskId: string;
};

const TagItem: FC<TProps> = ({ editable, taskId }) => {
  const dispatch = useAppDispatch();
  const tagSelect = useAppSelector(getTag);

  const handleClose = ( id: string, name: string) => {
    if (id && taskId) {
      dispatch(unassignTagAction({ task_tag_id: id, task_id: taskId, name }));
    }
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
            return <div key={item.key}>{item}</div>;
          })}
        </Menu.SubMenu>
      </Menu>
      <div className={styles.tag}>{tag?.slice(0, MIN_NUMBER_TAGS_ON_PAGE)}</div>
    </>
  );
};

export default TagItem;
