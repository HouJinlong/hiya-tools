import React from 'react';
import { withTheme, FormProps } from '@rjsf/core';
import { Theme as AntDTheme } from '@rjsf/antd';
import * as Style from './style';
import * as widgets from '../widgets';
import * as fields from '../fields';
import FieldTemplate from './FieldTemplate';
const FormComponent = withTheme(AntDTheme) as any;
interface MyFormProps extends FormProps<any> {
  widgets?: any;
}
export function Form(props: MyFormProps) {
  return (
    <Style.Box>
      <FormComponent
        {...props}
        fields={{
          ...fields,
          ...props.fields,
        }}
        FieldTemplate={FieldTemplate}
        widgets={{
          ...widgets,
          ...props.widgets,
        }}
      />
    </Style.Box>
  );
}
