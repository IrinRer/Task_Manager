import React, { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Button } from 'antd';
import {
  getDescription,
  getEditDescLoading,
  getTaskId,
} from 'store/editTask/selectors';
import { setTaskDescription } from 'store/editTask/thunks/setTaskDescription';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import Spinner from 'components/Common/Spinner';
import classnames from 'classnames';
import styles from './index.module.scss';

const Description: React.FC = () => {
  const EXP_TEXT = {
    expand: 'Показать целиком',
    collapse: 'Скрыть полное описание',
  };

  const dispatch = useAppDispatch();
  const description = useAppSelector(getDescription);
  const taskId = useAppSelector(getTaskId);
  const editLoading = useAppSelector(getEditDescLoading);

  const [newDesc, setNewDesc] = useState<string | undefined>(description);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const isBigDesc = (str: string) => {
    return str ? str.length > 300 : false;
  };

  const [isFullText, setIsFullText] = useState<boolean>(
    !isBigDesc(description || ''),
  );

  const expandText = isFullText ? EXP_TEXT.collapse : EXP_TEXT.expand;

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDesc(e.target.value);
  };

  const getShortDesc = () => {
    return `${newDesc?.slice(0, 300).trim()} ...`;
  };

  const setInitialExpand = () => {
    if (isBigDesc(description || '')) {
      setIsFullText(false);
    }
  };

  const handleSave = () => {
    if (taskId) {
      dispatch(
        setTaskDescription({ task_id: taskId, description: newDesc || '' }),
      );
    }
    setIsReadonly(true);
    setInitialExpand();
  };

  const handleCancel = () => {
    setNewDesc(description);
    setIsReadonly(true);
    setInitialExpand();
  };

  const handleChange = () => {
    setIsReadonly(!isReadonly);
    setIsFullText(true);
  };

  const expandChange = () => {
    setIsFullText(!isFullText);
  };

  if (editLoading) {
    return (
      <div className={styles.description}>
        <Spinner margin="0 auto" size="default" />
      </div>
    );
  }

  return (
    <div className={styles.description}>
      {isReadonly ? (
        <Button className={styles.change} onClick={handleChange}>
          изменить
        </Button>
      ) : null}

      <TextArea
        autoSize
        maxLength={500}
        placeholder="Введите описание, чтобы сделать задачу понятнее"
        className={classnames(styles.desc, {
          [styles.readonly]: isReadonly,
        })}
        onChange={changeDescription}
        value={isFullText ? newDesc : getShortDesc() || ''}
        readOnly={isReadonly}
      />

      {!isReadonly ? (
        <>
          <Button className={styles.save} onClick={handleSave}>
            Сохранить
          </Button>
          <Button className={styles.cancel} onClick={handleCancel}>
            Отменить
          </Button>{' '}
        </>
      ) : null}

      {isReadonly && isBigDesc(description || '') ? (
        <Button className={styles.expand} onClick={expandChange}>
          {expandText}
        </Button>
      ) : null}
    </div>
  );
};

export default Description;
