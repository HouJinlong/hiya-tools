import React from 'react';
import { Input} from 'antd';
import {WidgetProps} from '@rjsf/core';
export const TextareaWidget:React.FC<WidgetProps> = ({
  // autofocus,
  disabled,
  formContext,
  id,
  // label,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  readonly,
  // required,
  // schema,
  value,
}) => {
  console.log(options);
  const { readonlyAsDisabled = true } = formContext;

  const handleChange = ({ target }:any) =>
    onChange(target.value === '' ? options.emptyValue : target.value);

  const handleBlur = ({ target }:any) => onBlur(id, target.value);

  const handleFocus = ({ target }:any) => onFocus(id, target.value);

  return (
    <Input.TextArea
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      value={value}
      {...options}
    />
  );
};

export default TextareaWidget;
