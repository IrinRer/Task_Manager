type TOption = {
  value: string;
  children: string;
};

const useSelectOptions = () => {
  const filterOption = (input: string, option: TOption) => {
    return option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const filterSort = (optionA: TOption, optionB: TOption) => {
    return optionA!.children
      .toLowerCase()
      .localeCompare(optionB!.children.toLowerCase());
  };
  return {
    maxTagCount: 1,
    listHeight: 118,
    showSearch: true,
    autoFocus: true,
    open: true,
    placeholder: 'Искать участников',
    optionFilterProp: 'children',
    defaultOpen: true,
    filterOption,
    filterSort,
  };
};

export default useSelectOptions;
