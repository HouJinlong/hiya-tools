import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
const { RangePicker: AntdRangePicker } = AntdDatePicker;
import { Field } from '@rjsf/core';
import { Theme } from '@rjsf/antd';
import moment from 'moment';
const { FieldTemplate } = Theme;
export const DatePicker: Field = (props) => {
  const { valueFormat, ...options } = props.uiSchema['ui:options'] as any;
  return (
    <FieldTemplate
      {...props}
      label={props.schema.title || props.name}
      displayLabel={true}
    >
      <AntdDatePicker
        style={{
          width: '100%',
        }}
        defaultValue={props.formData && moment(props.formData)}
        onChange={(m, s) => {
          props.onChange(valueFormat ? m?.format(valueFormat) : s);
        }}
        {...options}
      />
    </FieldTemplate>
  );
};

export const RangePicker: Field = (props) => {
  const { valueFormat, ...options } = props.uiSchema['ui:options'] as any;
  return (
    <FieldTemplate
      {...props}
      label={props.schema.title || props.name}
      displayLabel={true}
    >
      <AntdRangePicker
        style={{
          width: '100%',
        }}
        defaultValue={(props.formData || []).map((v: any) => moment(v))}
        onChange={(m, s) => {
          props.onChange(
            valueFormat ? m?.map((v:any) => v.format(valueFormat)) : s
          );
        }}
        {...options}
      />
    </FieldTemplate>
  );
};
