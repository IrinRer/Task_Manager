import React, { FC } from 'react';
import { Menu, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { selectPopulatedTags } from 'store/common/tags/selectors';
import { assignTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { setIsModalVisibleMain } from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import { getTaskId } from 'store/editTask/selectors';
import { IPopulatedTag } from 'store/common/tags/types';
import styles from './index.module.scss';

interface IProps {
  onClickDelete: (key: string | undefined, name: string) => void;
  onClickEdit: (task_tag_id: string, value: string, color: string) => void;
}

const MenuTag: FC<IProps> = ({ onClickDelete, onClickEdit }) => {
  const dispatch = useAppDispatch();

  const populatedTags = useAppSelector(selectPopulatedTags);
  const taskId = useAppSelector(getTaskId);

  const onSelect = (item: IPopulatedTag) => {
    setIsModalVisibleMain(true);
    if (item.task_tag_id && taskId) {
      dispatch(
        assignTagAction({
          name: item.name,
          color: item.color,
          task_tag_id: item.task_tag_id,
          task_id: taskId,
        }),
      );
    }
  };

  return (
    <Menu mode="vertical" className={styles.menu}>
      {populatedTags?.map((item) => {
        return (
          <div className={styles.wrapperSelect} key={item.name}>
            <Button
              className={styles.wrapperMenuItem}
              onClick={() => onSelect(item)}
            >
              <div className={styles.menuItem}>
                <div color={item.color} className={styles.colorItem} />
                <p>{item.name}</p>
              </div>
            </Button>
            <div className={styles.wrapperIcon}>
              <Button
                icon={<EditOutlined className={styles.iconEdit} />}
                className={styles.btnIcon}
                onClick={() =>
                  onClickEdit(item.task_tag_id, item.name, item.color)
                }
              />
              <Button
                icon={<DeleteOutlined className={styles.iconDelete} />}
                className={styles.btnIcon}
                onClick={() => onClickDelete(item.key, item.name)}
              />
            </div>
          </div>
        );
      })}
    </Menu>
  );
};

export default MenuTag;
