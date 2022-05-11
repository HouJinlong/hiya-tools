import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
const { RangePicker: AntdRangePicker } = AntdDatePicker;
import { FieldTemplateProps } from '@rjsf/core';
import { Theme } from '@rjsf/antd';
import moment from 'moment';
const { FieldTemplate } = Theme;
export const DatePicker = (props:FieldTemplateProps<any>) => {
  const { valueFormat, ...options } = props.uiSchema['ui:options'] as any;
  return (
    <FieldTemplate
      {...props}
      displayLabel={true}
    >
      <AntdDatePicker
        style={{
          width: '100%',
        }}
        onChange={(m, s) => {
          props.onChange(valueFormat ? m?.format(valueFormat) : s);
        }}
        {...options}
        defaultValue={props.formData && moment(props.formData)}
      />
    </FieldTemplate>
  );
};

export const RangePicker = (props:FieldTemplateProps<any>) => {
  const { valueFormat, ...options } = props.uiSchema['ui:options'] as any;
  return (
    <FieldTemplate
      {...props}
      displayLabel={true}
    >
      <AntdRangePicker
        style={{
          width: '100%',
        }}
        onChange={(m, s) => {
          props.onChange(
            valueFormat ? m?.map((v:any) => v.format(valueFormat)) : s
          );
        }}
        {...options}
        defaultValue={(props.formData || []).map((v: any) => moment(v))}
      />
    </FieldTemplate>
  );
};


// {
//   1:{
//     id:榜单ID
//     类型：榜单
//   }
//   2:{
//     id:积分ID
//     类型：1212
//   }
// }