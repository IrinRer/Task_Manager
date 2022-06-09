import React, { useState } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import { createTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { uniqueTagNameSelector } from 'store/editTask/additionalFunctions/tag/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { ITag } from 'store/common/tags/types';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import TagItem from './TagItem';
import ModalNewTag from './ModalNewTag';
import ModalTag from './ModalTag';

import styles from './index.module.scss';

const SelectTag: React.FC = () => {
  const [isModalVisibleMain, setIsModalVisibleMain] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);

  const taskId = useAppSelector(getTaskId); 

  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editTag);

  const uniqueTagName = useAppSelector(uniqueTagNameSelector);

  const openWindowCreate = () => {
    setIsModalVisibleCreate(true);
    setIsModalVisibleMain(false);
  };

  const showModal = () => {
    setIsModalVisibleMain(true);
  };

  const className = classnames(styles.wrapper_flex, {
    [styles.wrapper_grid]: uniqueTagName?.length,
  });

  return (
    <div className={className}>
      <TagItem editable={isRights} taskId={taskId} />
      {isRights ? (
        <Button
          type="primary"
          onClick={showModal}
          className={styles.btn}
          shape="round"
        >
          + Добавить метку
        </Button>
      ) : null}
      <ModalNewTag
        isVisible={isModalVisibleMain}
        setVisible={setIsModalVisibleMain}
        openWindowCreate={openWindowCreate}
      />
      <ModalTag
        isVisible={isModalVisibleCreate}
        setIsModalVisibleCreate={setIsModalVisibleCreate}
        setIsModalVisibleMain={setIsModalVisibleMain}
        text="Новая метка"
        arg={taskId}
        action={createTagAction}
      />
    </div>
  );
};

export default SelectTag;
