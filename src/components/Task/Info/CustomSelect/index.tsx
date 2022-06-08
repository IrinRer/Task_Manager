import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { TOption } from '../TaskHook/useSelectOptions';

const { Option } = Select;

interface ICustomSelect<T> {
  list: T[] | null;
  itemKey: string;
  itemLabel?: string;
  itemValue: string;
  OptionItem: React.FC<{ user: T; size?: 'L' | 'M' }>;
}

const withAddOption = <P,>(BaseComponent: React.FC<P>) => {
  return (props: P) => {
    return <BaseComponent {...props} />;
  };
};

const CustomSelect = <T,>(
  props: React.PropsWithChildren<
    ICustomSelect<T> & SelectProps<SelectValue, TOption>
  >,
): React.ReactElement => {
  const { list, itemKey, itemValue, OptionItem, ...rest } = props;

  const OptionElem = withAddOption<{ user: T; size?: 'L' | 'M' }>(OptionItem);

  const itemList = list?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        <OptionElem user={el} size="L" />
      </Option>
    );
  });
  return <Select {...rest}>{itemList}</Select>;
};

export default CustomSelect;
