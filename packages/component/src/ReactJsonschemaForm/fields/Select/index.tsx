import React from 'react';
import { Select as AntdSelect} from 'antd';
import { FieldTemplateProps } from '@rjsf/core';
import { Theme } from '@rjsf/antd';
const { FieldTemplate } = Theme;
interface LabelsType{
  value:any,
  label:any
}
export const Select = (props:FieldTemplateProps<any>) => {
  const { labels =[], ...options } = props.uiSchema['ui:options'] as any;
  return (
    <>
    <FieldTemplate
      {...props}
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
    </>
  );
};
