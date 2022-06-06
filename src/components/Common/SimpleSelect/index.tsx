import React, { FC, ReactElement } from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import MemberItem from 'components/Task/Members/MemberItem';
import { TOption } from '../../Task/Info/TaskHook/useSelectOptions';

const { Option } = Select;

interface TProps<T> {
  user?: T;
}

interface ISimpleSelect<T, U> {
  list: T[] | null;
  itemKey: string;
  itemLabel?: string;
  itemValue: string;
  OptionItem?: FC<TProps<T>>;
}

const withAdd = <R, T>(BaseComponent: React.FC<TProps<T>>) => {
  return (props: React.PropsWithChildren<TProps<T>>) => {
    return <BaseComponent {...props} />;
  };
};

const SimpleSelect = <T, U>(
  props: React.PropsWithChildren<
    ISimpleSelect<T, U> & SelectProps<SelectValue, TOption>
  >,
): React.ReactElement => {
  const { list, itemKey, itemLabel, itemValue, OptionItem, ...rest } = props;

  const OptionElem = withAdd<undefined, T>(
    OptionItem ||
      (() => {
        return null;
      }),
  );

  const itemList = list?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        <OptionElem user={el} />
      </Option>
    );
  });
  return <Select {...rest}>{itemList}</Select>;
};

export default SimpleSelect;
