import React, { useRef } from 'react';
import { Input, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import {WidgetProps} from '@rjsf/core';
import * as Style from './style';
export const ColorInput: React.FC<WidgetProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  return (
    <Style.Box ref={container}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            getPopupContainer={() => container.current!}
            content={
              <SketchPicker
                color={props.value}
                onChange={({ rgb }) => {
                  props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
                }}
              />
            }
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '2px',
                border: '1px solid #d9d9d9',
                cursor: 'pointer',
                background: props.value,
              }}
            ></div>
          </Popover>
        }
      />
    </Style.Box>
  );
};
