import React from 'react';
import { Input,Upload} from 'antd';
import * as Style from './style';
import {WidgetProps} from '@rjsf/core';
import { IconWidget } from '../../../IconWidget';
export const ImageInput: React.FC<WidgetProps> = (props) => {
  let {customRequest,...otherUploadProps} = props.uiSchema.UploadProps || props.formContext.UploadProps ||{}
  if(customRequest){
    otherUploadProps['customRequest'] = customRequest(props)
  }
  return (
    <Style.Box>
      <Input
        addonBefore={<Upload accept="image/*" showUploadList={false} {...otherUploadProps} ><IconWidget icon="CloudUpload"  title='点击上传' /></Upload>} 
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        placeholder=""
      />
    </Style.Box>
  );
};
export const CssImageInput: React.FC<WidgetProps> = (props) => {
  const addBgValue = (value: any) => {
    if (/url\([^)]+\)/.test(value)) {
      return value;
    }
    return value?`url(${value})`:value;
  };
  const removeBgValue = (value: any) => {
    const matched = String(value).match(/url\(\s*([^)]+)\s*\)/);
    if (matched?.[1]) {
      return matched?.[1];
    }
    return value;
  };
  return <ImageInput {...props}  value={removeBgValue(props.value)}  onChange={(e) => props.onChange(addBgValue(e))} />
};
