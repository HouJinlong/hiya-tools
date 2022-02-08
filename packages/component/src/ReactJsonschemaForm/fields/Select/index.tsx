import React from 'react';
import { Select as AntdSelect } from 'antd';
import { Field } from '@rjsf/core';
import { Theme } from '@rjsf/antd';
const { FieldTemplate } = Theme;
interface LabelsType{
  value:any,
  label:any
}
export const Select: Field = (props) => {
  const { labels =[], ...options } = props.uiSchema['ui:options'] as any;
  return (
    <FieldTemplate
      {...props}
      label={props.schema.title || props.name}
      displayLabel={true}
    >
      <AntdSelect
        style={{
          width: '100%',
        }}
        defaultValue={props.formData}
        onChange={(e)=>{
          props.onChange(e)
        }}
        {...options}
      >
        {(labels as  LabelsType[]).map(v=>{
          return <AntdSelect.Option value={v.value} key={v.value}>{v.label}</AntdSelect.Option>
        })}
     </AntdSelect>
    </FieldTemplate>
  );
};
