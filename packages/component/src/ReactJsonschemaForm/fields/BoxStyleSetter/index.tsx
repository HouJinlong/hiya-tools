import { Collapse } from 'antd';
import React from 'react';
import { IconWidget } from '../../../IconWidget';
import * as Style from './style';
import { SizeInput } from '../../widgets/SizeInput';
import {Field} from '@rjsf/core';
import { Theme  } from '@rjsf/antd';
const {FieldTemplate} = Theme
type Position = 'top' | 'right' | 'left' | 'bottom' | 'all';

const BoxRex =
  /([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+))?)?)?/;
const PositionMap = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  all: 1,
};
export const BoxStyleSetter:Field  = (props)=>{
  const createPositionHandler = (position: Position, props: any) => {
    const matched = String(props.formData).match(BoxRex) || [];
    const value = matched[PositionMap[position]];
    const v1 = matched[1];
    const v2 = matched[2];
    const v3 = matched[3];
    const v4 = matched[4];
    const allEqualls = v1 === v2 && v2 === v3 && v3 === v4;
    return {
      ...props,
      value: position === 'all' ? (allEqualls ? v1 : undefined) : value,
      onChange(value: string) {
        if (position === 'all') {
          props.onChange?.(
            `${value || '0px'} ${value || '0px'} ${value || '0px'} ${
              value || '0px'
            }`
          );
        } else {
          matched[PositionMap[position]] = value;
          props.onChange?.(
            `${matched[1] || '0px'} ${matched[2] || '0px'} ${
              matched[3] || '0px'
            } ${matched[4] || '0px'}`
          );
        }
      },
    };
  };
  return (
    <Style.Box>
      <Collapse ghost>
        <Collapse.Panel
          header={
            <FieldTemplate {...props} label={props.schema.title || props.name} displayLabel={true}>
              <SizeInput
                  {...createPositionHandler('all', props)}
                  exclude={['inherit', 'auto']}
                />
            </FieldTemplate>
          }
          key="1"
        >
          <Style.Wrap>
            {Object.keys(PositionMap)
              .slice(0, 4)
              .map((v,i) => {
                return (
                  <Style.Item>
                    <IconWidget {...((props.uiSchema['ui:options']?.labels as [])[i])} />
                    <SizeInput
                      {...createPositionHandler(v as Position, props)}
                      exclude={['inherit', 'auto']}
                    />
                  </Style.Item>
                );
              })}
          </Style.Wrap>
        </Collapse.Panel>
      </Collapse>
    </Style.Box>
  );
};