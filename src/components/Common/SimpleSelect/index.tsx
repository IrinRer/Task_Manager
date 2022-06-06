import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { TOption } from '../../Task/Info/TaskHook/useSelectOptions';

const { Option } = Select;

interface ISimpleSelect<T> {
  list: T[] | null;
  itemKey: string;
  itemLabel?: string;
  itemValue: string;
  // optionPropName?: string;
  // OptionItem?: React.FC<{ optionPropName: T }>;
  OptionItem?: React.FC<{ user: T; size?: 'L' | 'M' }>;
}

const withAdd = <P,>(BaseComponent: React.FC<P>) => {
  return (props: P) => {
    return <BaseComponent {...props} />;
  };
};

const SimpleSelect = <T,>(
  props: React.PropsWithChildren<
    ISimpleSelect<T> & SelectProps<SelectValue, TOption>
  >,
): React.ReactElement => {
  const { list, itemKey, itemLabel, itemValue, OptionItem, ...rest } = props;

  const OptionElem = withAdd<{ user: T; size?: 'L' | 'M' }>(
    OptionItem ||
      (() => {
        return null;
      }),
  );

  const itemList = list?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        <OptionElem user={el} size="L" />
      </Option>
    );
  });
  return <Select {...rest}>{itemList}</Select>;
};

export default SimpleSelect;
