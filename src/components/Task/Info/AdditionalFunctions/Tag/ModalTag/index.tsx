import React, { useState } from 'react';
import { Modal, Button, Typography, Input, Form, Radio } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { uniqueTagNameSelector } from 'store/editTask/additionalFunctions/tag/selectors';
import { allColorTag } from 'constants/additionalFunctions/color';
import { MAX_NUMBER_TAGS } from 'constants/additionalFunctions/tag';

import styles from '../index.module.scss';

const { Text } = Typography;

const ModalTag = ({
  isVisible,
  setIsModalVisibleCreate,
  setIsModalVisibleMain,
  text,
  action,
  arg,
}) => {
  const [colorTag, setColor] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const uniqueTagName = useAppSelector(uniqueTagNameSelector);
  const isUniqueTag = uniqueTagName?.indexOf(inputValue) === -1 && inputValue;

  const handleOk = () => {
    setIsModalVisibleMain(false);
    setIsModalVisibleCreate(false);

    setColor('');
    setInputValue('');
    form.resetFields();

    if (inputValue && isUniqueTag && uniqueTagName.length < MAX_NUMBER_TAGS) {
      dispatch(action({ name: inputValue, color: colorTag, arg }));
    }
  };

  const handleCancel = () => {
    setIsModalVisibleCreate(false);
  };

  const onChecked = (e) => {
    if (e.target.checked) {
      setColor(e.target.value);
    } else setColor('');
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
          disabled={!isUniqueTag}
        >
          Cохранить
        </Button>
      }
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Text type="secondary">Название метки</Text>
      <Form form={form}>
        <Form.Item name="input" key="input">
          <Input
            className={styles.input}
            maxLength={15}
            autoFocus
            onChange={onChangeInput}
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
