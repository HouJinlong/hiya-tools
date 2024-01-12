import React,{PropsWithChildren} from 'react';
import { Input,Upload,Popover,Image} from 'antd';
import * as Style from './style';
import {WidgetProps} from '@rjsf/core';
import { IconWidget } from '../../../IconWidget';
export const AddonWarp = (props: PropsWithChildren<unknown>) => {
  return (
    <>
      <div
        style={{
          width: '1em',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export const ImageInput: React.FC<WidgetProps> = (props) => {
  let {customRequest,...otherUploadProps} = {
    ...props.formContext.UploadProps,
    ...props.uiSchema.UploadProps 
  } as  any
  if(customRequest){
    otherUploadProps['customRequest'] = customRequest(props)
  }
  return (
    <Style.Box>
      <Input
        addonBefore={<Upload accept="image/*" showUploadList={false} {...otherUploadProps} ><IconWidget icon="CloudUpload"  title='点击上传' /></Upload>} 
        addonAfter={
          <AddonWarp>
            {props.value ? (
              <Popover
                content={
                  <Image
                    src={props.value}
                    style={{
                      maxHeight: '300px',
                      maxWidth: '300px',
                    }}
                  />
                }
              >
                <Image
                  src={props.value}
                  preview={false}
                  style={{
                    display: 'block',
                    margin: '5px',
                    maxHeight: '20px',
                    maxWidth: '20px',
                  }}
                />
              </Popover>
            ) : (
              <IconWidget icon="Imgage" title={"图片预览"}></IconWidget>
            )}
          </AddonWarp>
        }
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
