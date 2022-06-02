import React, { useState } from 'react';
import classnames from 'classnames';
import { Modal, Button, Typography, Input, Form, Radio } from 'antd';
import { createTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { allColorTag } from 'constants/additionalFunctions/color';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { uniqueTagNameSelector } from 'store/editTask/additionalFunctions/tag/selectors';
import { getTaskId } from 'store/editTask/selectors';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import TagItem from './TagItem';

import styles from './index.module.scss';

const { Text } = Typography;

const SelectTag = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorTag, setColor] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);

  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRights = getRights(myMaxRole, RIGHTS_NAMES.editTag);

  const uniqueTagName = useAppSelector(uniqueTagNameSelector);
  const isUniqueTag = uniqueTagName?.indexOf(inputValue) === -1;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // после того, как нажали на кнопку 'Cохранить' colorTag очищается и никакой цвет не выбран
    // и очищается форма
    setColor('');
    form.resetFields();

    // если inputValue не содержится в uniqueTag, то createTagAction делает post запрос
    // нужно, чтобы не было одинаковых тегов
    if (inputValue && isUniqueTag && uniqueTagName.length < 50) {
      dispatch(
        createTagAction({ name: inputValue, color: colorTag, task_id: taskId }),
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChecked = (e) => {
    if (e.target.checked) {
      // если checked = true, то устанавливаем в color тот checkbox(цвет), который был выбран
      setColor(e.target.value);
    } else setColor('');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const className = classnames(styles.wrapper_flex, {
    [styles.wrapper_grid]: uniqueTagName?.length,
  });

  return (
    <div className={className}>
      <TagItem editable={isRights} />
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

      <Modal
        title="Новая метка"
        visible={isModalVisible}
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
                    <Radio.Button
                      value={item}
                      key={item}
                      onChange={onChecked}
                    />
                  </div>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SelectTag;
