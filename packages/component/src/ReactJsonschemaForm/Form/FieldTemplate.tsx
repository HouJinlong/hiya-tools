import React from 'react';
import { Theme } from '@rjsf/antd';
import {FieldTemplateProps} from '@rjsf/core';
const {FieldTemplate} = Theme
import * as fields from '../fields';
let custom:any;
export default function(props:FieldTemplateProps<any>){
    if(!custom){
        custom= Object.keys(fields);
    }
    const id = custom.includes(props.uiSchema['ui:field'] as string)?'root':props.id
    return <FieldTemplate {...props} id={id} />
}