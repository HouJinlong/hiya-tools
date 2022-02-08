import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import * as Style from './style';
export interface IInput {
  style?: React.CSSProperties;
  value: any;
  onChange: (value: any) => void;
  exclude?: string[];
  include?: string[];
}
export interface IPolyType {
  type: string;
  title?: string;
  component?: any;
  checker: (value: any) => boolean;
  toInputValue?: (value: any) => any;
  toChangeValue?: (value: any) => any;
}

export type PolyTypes = IPolyType[];

const isValid = (val: any) => val !== undefined && val !== null;

const getEventValue = (event: any) => {
  if (event?.target) {
    if (isValid(event.target.value)) return event.target.value;
    if (isValid(event.target.checked)) return event.target.checked;
    return;
  }
  return event;
};

const createTypes = (
  types: PolyTypes,
  exclude: IInput['exclude'],
  include: IInput['include']
) => {
  return types.filter(({ type }) => {
    if (Array.isArray(include) && include.length) {
      return include.includes(type);
    }
    if (Array.isArray(exclude) && exclude.length) {
      return !exclude.includes(type);
    }
    return true;
  });
};

export function createPolyInput(polyTypes: PolyTypes = []): React.FC<IInput> {
  return ({ style, value, onChange, exclude, include, ...props }) => {
    const types = createTypes(polyTypes, exclude, include);
    const [current, setCurrent] = useState(types[0]?.type);
    const type = types?.find(({ type }) => type === current) as IPolyType;
    const component = type?.component;
    const typesValue = useRef<any>({});
    useEffect(() => {
      types?.forEach((type) => {
        if (type.checker(value)) {
          setCurrent(type.type);
          typesValue.current[type.type] = type?.toInputValue
            ? type?.toInputValue(value)
            : value;
        }
      });
    }, [value]);

    const getNextType = () => {
      const currentIndex = types?.findIndex(({ type }) => type === current);
      const nextIndex =
        currentIndex + 1 > types?.length - 1 ? 0 : currentIndex + 1;
      return types[nextIndex];
    };

    const transformOnChangeValue = (value: any, type: IPolyType) => {
      return type?.toChangeValue ? type?.toChangeValue(value) : value;
    };
    return (
      <Style.Box style={style}>
        {component && (
          <div style={{ marginRight: '2px', flex: '1' }}>
            {React.createElement(component, {
              ...props,
              style: {
                width: '100%',
              },
              value: type?.toInputValue ? type?.toInputValue(value) : value,
              onChange: (event: any) => {
                const value = getEventValue(event);
                onChange?.(transformOnChangeValue(value, type));
              },
            })}
          </div>
        )}
        <Button
          style={{
            width: !component ? '100%' : 'auto',
            padding: '0 8px',
          }}
          block
          onClick={() => {
            const nextType = getNextType();
            if (nextType === type) return;
            onChange?.(
              transformOnChangeValue(
                typesValue.current[nextType?.type],
                nextType
              )
            );
          }}
        >
          {type?.title || type?.type}
        </Button>
      </Style.Box>
    );
  };
}
