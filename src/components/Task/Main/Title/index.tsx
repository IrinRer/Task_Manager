import React, { Ref, useRef, useState } from 'react';
import TextArea, { TextAreaRef } from 'antd/lib/input/TextArea';
import {
  getEditTitleLoading,
  getTaskId,
  getTitle,
} from 'store/editTask/selectors';
import { setTaskTitle } from 'store/editTask/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import Spinner from 'components/Common/Spinner';
import classnames from 'classnames';
// import DropMenu from 'components/Task/Title/AddFunctionality';
import { Button } from 'antd';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { TITLE_TASK_MAX_LENGTH } from 'constants/common';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

const Title: React.FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(getTitle);
  const taskId = useAppSelector(getTaskId);
  const editLoading = useAppSelector(getEditTitleLoading);

  const inputRef: Ref<TextAreaRef> | undefined = useRef(null);
  const [newTitle, setNewTitle] = useState<string | undefined>(title);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editTitle);

  const changeReadonly = () => {
    setIsReadonly(!isReadonly);
    inputRef.current!.focus({
      cursor: 'end',
    });
  };

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value);
  };

  const onBlur = () => {
    setNewTitle(newTitle?.trim());

    if (taskId && newTitle && !isReadonly && newTitle.trim() !== '') {
      dispatch(setTaskTitle({ task_id: taskId, title: newTitle.trim() }));
    }
    setIsReadonly(true);
  };

  if (editLoading) {
    return (
      <div className={styles.wrapname}>
        <Spinner margin="0 auto" size="default" />
      </div>
    );
  }

  return (
    <div className={styles.wrapname}>
      <TextArea
        ref={inputRef}
        autoSize
        maxLength={TITLE_TASK_MAX_LENGTH}
        placeholder="Введите название"
        className={classnames(styles.name, {
          [styles.readonly]: isReadonly,
          [styles.error]: !newTitle,
        })}
        onChange={changeTitle}
        onPressEnter={onBlur}
        onBlur={onBlur}
        value={newTitle || ''}
        readOnly={isReadonly}
      />
      {isReadonly && isRights && (
        <Button
          ghost
          icon={<EditIcon />}
          size="small"
          onClick={changeReadonly}
        />
      )}
    </div>
  );
};

export default Title;
