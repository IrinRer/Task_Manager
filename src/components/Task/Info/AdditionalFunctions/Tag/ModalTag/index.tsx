import React, { useState, useEffect, FC, useRef} from 'react';
import {
  Modal,
  Button,
  Typography,
  Input,
  Form,
  Radio,
  RadioChangeEvent,
} from 'antd';
import { AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setIsModalVisibleMain } from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import { uniqueTagNameSelector } from 'store/editTask/additionalFunctions/tag/selectors';
import { allColorTag } from 'constants/additionalFunctions/color';
import { ITagThunkEditCreat } from 'store/editTask/additionalFunctions/tag/types';
import { MAX_NUMBER_TAGS, NEW_TAG } from 'constants/additionalFunctions/tag';
import { TAGS_INPUT_MAX_LENGTH } from 'constants/common';
import { selectPopulatedTags } from 'store/common/tags/selectors';
import styles from '../index.module.scss';

const { Text } = Typography;

interface IArg {
  name: string;
  color: string;
  arg: string;
}

interface IProps {
  text: string;
  action: AsyncThunk<IArg, ITagThunkEditCreat, {}>;
  arg: { tagId?: string; name?: string; color?: string; taskId?: string };
  isVisible: boolean;
  setIsModalVisible: (action: boolean) => AnyAction;
}

const ModalTag: FC<IProps> = ({
  text,
  action,
  arg,
  isVisible,
  setIsModalVisible,
}) => {
  const [colorTag, setColor] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue({
        input: arg.name,
        checkbox: arg.color,
      });
    }
  }, [form, arg]);

  const dispatch = useAppDispatch();

  const uniqueTagName = useAppSelector(uniqueTagNameSelector);
  const isUniqueTag = uniqueTagName?.indexOf(inputValue) === -1 && inputValue;
  const allTag = useAppSelector(selectPopulatedTags);

  const conditionDisable = allTag.length >=  MAX_NUMBER_TAGS && text === NEW_TAG;

  const resetForm = () => {
    setColor('');
    setInputValue('');
    form.resetFields();
  };

  const handleOk = () => {
    dispatch(setIsModalVisibleMain(false));
    dispatch(setIsModalVisible(false));

    resetForm();

    if (inputValue && isUniqueTag && uniqueTagName.length < MAX_NUMBER_TAGS) {
      dispatch(action({ name: inputValue, color: colorTag, arg }));
    }
  };

  const handleCancel = () => {
    resetForm();
    dispatch(setIsModalVisible(false));
  };

  const onChecked = (e: RadioChangeEvent) => {
    if (e.target.checked) {
      setColor(e.target.value);
    } else setColor('');
  };

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      handleOk();
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Modal
      title={text}
      visible={isVisible}
      width={310}
      className={styles.modalTag}
      footer={
        <Button
          className={styles.btn}
          onClick={handleOk}
          htmlType="submit"
          disabled={!isUniqueTag || conditionDisable}
        >
          Cохранить
        </Button>
      }
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Text type="secondary">Название метки</Text>
      <Form form={form} onKeyPress={onEnter} ref={formRef}>
        <Form.Item name="input" key="input">
          <Input
            className={styles.input}
            maxLength={TAGS_INPUT_MAX_LENGTH}
            onChange={onChangeInput}
            autoFocus
          />
        </Form.Item>
        <Form.Item name="checkbox" key="checkbox">
          <Radio.Group>
            {allColorTag.map((item) => {
              return (
                <div className={styles.wrapper} color={item} key={item}>
                  <Radio.Button value={item} key={item} onChange={onChecked} />
                </div>
              );
            })}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTag;
