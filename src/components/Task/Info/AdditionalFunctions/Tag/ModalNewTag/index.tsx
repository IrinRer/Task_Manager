import React, { useState, FC } from 'react';
import { Modal, Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { editTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTag } from 'store/editTask/additionalFunctions/tag/selectors';
import {
  setIsModalVisibleEdit,
  setIsModalVisibleMain,
  setIsVisibleModalDelete,
} from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import {
  isModalVisibleEdit,
  isModalVisibleMain,
} from 'store/editTask/additionalFunctions/tag/modalVisible/selectors';
import { deleteTagAction } from 'store/common/tags/thunk';
import { MAX_NUMBER_TAGS } from 'constants/additionalFunctions/tag';
import ModalDelete from 'components/Common/ModalDelete';
import ModalTag from '../ModalTag';
import MenuTag from './Menu';

import styles from '../index.module.scss';

interface IProps {
  openWindowCreate: () => void;
}

const ModalNewTag: FC<IProps> = ({ openWindowCreate }) => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTag);
  const isVisible = useAppSelector(isModalVisibleMain);
  const isVisibleEdit = useAppSelector(isModalVisibleEdit);

  const [name, setName] = useState('');
  const [tagId, setTagId] = useState<string>('');
  const [color, setColor] = useState('');
  const [id, setId] = useState<string>('');
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const onClickDelete = (id: string, name: string) => {
    setVisibleModalDelete(true);
    setName(name);
    setId(id);
  };

  const onClickEdit = (tagId: string, name: string, color: string) => {
    setTagId(tagId);
    setName(name);
    setColor(color);

    dispatch(setIsModalVisibleMain(true));
    dispatch(setIsModalVisibleEdit(true));
  };

  const onDelete = () => {
    dispatch(deleteTagAction(id));
    dispatch(setIsModalVisibleMain(false));
  };

  const handleCancel = () => {
    dispatch(setIsModalVisibleMain(false));
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
            disabled={tags.length > MAX_NUMBER_TAGS}
          >
            Создать метку
          </Button>
        }
        onCancel={handleCancel}
      >
        <MenuTag onClickDelete={onClickDelete} onClickEdit={onClickEdit} />
      </Modal>
      <ModalDelete
        textMain={`Метка ${name} будет удалена из списка меток и из всех задач проекта`}
        textButton="Удалить метку"
        visibleModalDelete={visibleModalDelete}
        setIsVisibleModalDelete={setVisibleModalDelete}
        target={id || ''}
        action={onDelete}
      />
      <ModalTag
        text="Изменить метку"
        isVisible={isVisibleEdit}
        setIsModalVisible={setIsModalVisibleEdit}
        action={editTagAction}
        arg={{ tagId, name, color }}
      />
    </>
  );
};

export default ModalNewTag;
