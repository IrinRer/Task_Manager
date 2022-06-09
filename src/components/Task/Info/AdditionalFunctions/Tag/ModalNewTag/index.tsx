import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { editTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { deleteTagAction } from 'store/common/tags/thunk';
import ModalDelete from 'components/Common/ModalDelete';
import ModalTag from '../ModalTag';
import MenuTag from './Menu';

import styles from '../index.module.scss';

const ModalNewTag = ({
  isVisible,
  setVisible,
  openWindowCreate
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [tagId, setTagId] = useState<string | undefined>('');
  const [id, setId] = useState<string | undefined>('');

  const onClickDelete = (id: string | undefined, name: string) => {
    setIsVisibleModalDelete(true);
    setName(name);
    setId(id);
  };

  const onClickEdit = (tagId: string | undefined) => {
    setTagId(tagId);
    setVisible(true);
    setIsModalVisibleEdit(true);
  };

  const onDelete = () => {
    dispatch(deleteTagAction(id));
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={isVisible}
        width={310}
        closable={false}
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
        <MenuTag
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      </Modal>
      <ModalDelete
        visible={isVisibleModalDelete}
        textMain={`Метка ${name} будет удалена из списка меток и из всех задач проекта`}
        textButton="Удалить метку"
        setVisibleModalDelete={setIsVisibleModalDelete}
        file={id || ''}
        action={onDelete}
      />
      <ModalTag
        text="Изменить метку"
        action={editTagAction}
        arg={tagId}
        isVisible={isModalVisibleEdit}
        setIsModalVisibleMain={setVisible}
        setIsModalVisibleCreate={setIsModalVisibleEdit}
      />
    </>
  );
};

export default ModalNewTag;
