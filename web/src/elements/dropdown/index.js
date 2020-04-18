// @flow
import * as React from 'react';
import Select from 'react-select';

type SelectOption = {
  label: string,
  value: string | number,
};

type Props = {
  options: Array<SelectOption>,
  defaultOption: SelectOption,
  onChange: (string | number) => void,
  width?: number,
};

// Custom styles for react-select
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width || '100%',
    textAlign: 'left',
  }),

  control: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

/**
 * Component for single-select dropdown with sync options
 * TODO: Add dropdown components for other types
 */
const Dropdown = (props: Props) => {
  const [selectedOption, setSelectedOption] = React.useState(
    props.defaultOption
  );

  const handleChange = (option, { action }) => {
    if (action !== 'select-option') return;
    if (!option || Array.isArray(option)) return;
    if (option.value === selectedOption.value) return;
    setSelectedOption(option);
    props.onChange(option.value);
  };

  return (
    <Select
      options={props.options}
      width={props.width}
      styles={customStyles}
      value={selectedOption}
      onChange={handleChange}
    ></Select>
  );
};

export default Dropdown;
