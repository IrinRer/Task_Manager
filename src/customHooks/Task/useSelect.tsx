type TOption = {
  value: string;
  children: string;
};

// type FilterFunc = (input: string, option: TOption) => TOption;

/* type TFilterOption =
  | boolean
  | FilterFunc
  | undefined
  | { value: string; children: string }; */

const filterOption = (input: string, option: TOption) => {
  return option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const filterSort = (optionA: TOption, optionB: TOption) => {
  return optionA!.children
    .toLowerCase()
    .localeCompare(optionB!.children.toLowerCase());
};

const useSelectOptions = () => {
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
