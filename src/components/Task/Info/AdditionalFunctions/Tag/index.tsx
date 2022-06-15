import React from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import { createTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { uniqueTagNameSelector } from 'store/editTask/additionalFunctions/tag/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import {
  setIsModalVisibleCreate,
  setIsModalVisibleMain,
} from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import { isModalVisibleCreate } from 'store/editTask/additionalFunctions/tag/modalVisible/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import TagItem from './TagItem';
import ModalNewTag from './ModalNewTag';
import ModalTag from './ModalTag';

import styles from './index.module.scss';

const SelectTag: React.FC = () => {
  const taskId = useAppSelector(getTaskId);
  const dispatch = useAppDispatch();
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editTag);
  const isVisibleCreate = useAppSelector(isModalVisibleCreate);

  const uniqueTagName = useAppSelector(uniqueTagNameSelector);

  const openWindowCreate = () => {
    dispatch(setIsModalVisibleCreate(true));
    dispatch(setIsModalVisibleMain(false));
  };

  const showModal = () => {
    dispatch(setIsModalVisibleMain(true));
  };

  const className = classnames(styles.wrapper_flex, {
    [styles.wrapper_grid]: uniqueTagName?.length,
  });

  return (
    <div className={className}>
      <TagItem editable={isRights} taskId={taskId || ''} />
      {isRights && (
        <Button
          type="primary"
          onClick={showModal}
          className={styles.btn}
          shape="round"
        >
          + Добавить метку
        </Button>
      ) }
      <ModalNewTag openWindowCreate={openWindowCreate} />
      <ModalTag
        text="Новая метка"
        arg={{ taskId }}
        action={createTagAction}
        isVisible={isVisibleCreate}
        setIsModalVisible={setIsModalVisibleCreate}
      />
    </div>
  );
};

export default SelectTag;
