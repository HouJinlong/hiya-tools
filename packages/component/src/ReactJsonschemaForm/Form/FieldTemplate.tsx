import React from 'react';
import { Theme } from '@rjsf/antd';
import {FieldTemplateProps} from '@rjsf/core';
const {FieldTemplate} = Theme
import * as fields from '../fields';
export default function(props:FieldTemplateProps<any>){
    const fieldKey =  props.uiSchema['ui:field'] as  keyof typeof fields
    if(fields[fieldKey]){
        const CustomFieldTemplate = fields[fieldKey] as  any
        return <CustomFieldTemplate {...props} />
    }else{
        return <FieldTemplate {...props} />
    }
}