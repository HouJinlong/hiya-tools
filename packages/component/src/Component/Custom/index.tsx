import React, { useContext, useMemo } from 'react';
import { ComponentType } from '../../Editor/EditorContext';
import { RenderViewContext } from '../../Editor/RenderView';
export const Custom = (props: any) => {
  const { other } = useContext(RenderViewContext);
  const CustomComponent = useMemo(() => {
    return (other.CustomComponents || [])[props.CustomComponentKey]?.Component;
  }, [props.CustomComponentKey]);
  return CustomComponent? <CustomComponent />:null;
};

export  const  CustomComponent:ComponentType = {
  Component: Custom,
  icon:'http://img01.mehiya.com/img/png/id/50721838516',
  name: '自定义组件',
  formData: {},
  getConfig: (data) => {
    return {
      schema: {
        type: 'object',
        required: [],
        properties: {
          CustomComponentKey: {
            type: 'string',
            title: '自定义组件',
          },
        },
      },
      uiSchema: {
        CustomComponentKey: {
          'ui:field': 'Select',
          'ui:options': {
            labels: data.EditDataState.other.CustomComponents,
            showSearch: true,
            filterOption: (input, option) =>
              option.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0,
          },
        },
      },
    };
  },
}