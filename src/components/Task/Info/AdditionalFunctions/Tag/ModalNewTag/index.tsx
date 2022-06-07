import React, { useState } from 'react';
import { Menu, Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { selectPopulatedTags } from 'store/common/tags/selectors';
import { assignTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { getTaskId } from 'store/editTask/selectors';
import { deleteTagAction } from 'store/common/tags/thunk';
import ModalDelete from 'components/Common/ModalDelete';
import styles from '../index.module.scss';

const ModalNewTag = ({ isVisible, setVisible, openWindowCreate }) => {
  const populatedTag = useAppSelector(selectPopulatedTags);
  const taskId = useAppSelector(getTaskId);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);
  const [id, setId] = useState<string | undefined>('');

  const onOk = (id: string | undefined, name: string) => {
    setIsVisibleModalDelete(true);
    setName(name);
    setId(id);
  };

  const onDelete = () => {
    dispatch(deleteTagAction(id));
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSelect = ({ key }) => {
    const tag = key.split(',');
    dispatch(
      assignTagAction({
        name: tag[0],
        color: tag[1],
        task_tag_id: tag[2],
        task_id: taskId,
      }),
    );
  };

  return (
    <>
      <Modal
        title="Создать новую метку"
        visible={isVisible}
        width={310}
        className={styles.modalTagMain}
        footer={
          <Button
            className={styles.btn}
            onClick={openWindowCreate}
            htmlType="submit"
          >
            Создать метку
          </Button>
        }
        onCancel={handleCancel}
      >
        <Menu mode="vertical" className={styles.menu} onSelect={onSelect}>
          {populatedTag?.map((item) => {
            return (
              <Menu.Item
                key={`${item.name},${item.color},${item.key}`}
                className={styles.wrapperMenuItem}
              >
                <div className={styles.menuItem}>
                  <div color={item.color} className={styles.colorItem} />
                  <p>{item.name}</p>
                </div>
                <div className={styles.wrapperIcon}>
                  <Button
                    icon={<EditOutlined className={styles.iconEdit} />}
                    className={styles.btnIcon}
                  />
                  <Button
                    icon={<DeleteOutlined className={styles.iconDelete} />}
                    className={styles.btnIcon}
                    onClick={() => onOk(item.key, item.name)}
                  />
                </div>
              </Menu.Item>
            );
          })}
        </Menu>
      </Modal>
      <ModalDelete
        visible={isVisibleModalDelete}
        textMain={`Метка ${name} будет удалена из списка меток и из всех задач проекта`}
        textButton="Удалить метку"
        setVisibleModalDelete={setIsVisibleModalDelete}
        file={id || ''}
        action={onDelete}
      />
    </>
  );
};

export default ModalNewTag;
