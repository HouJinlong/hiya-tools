import React from 'react';
import { Collapse } from 'antd';
import * as Style from './style';
import { Form } from '../../Form';
import { FormProps,Field} from '@rjsf/core';
const labels = [
  {
    icon: 'Top',
    title: '上',
  },
  {
    icon: 'Right',
    title: '右',
  },
  {
    icon: 'Bottom',
    title: '下',
  },
  {
    icon: 'Left',
    title: '左',
  },
];
const schema: any = {
  type: 'object',
  required: [],
  properties: {
    width: {
      type: 'string',
      title: '宽度',
    },
    height: {
      type: 'string',
      title: '高度',
    },
    minWidth: {
      type: 'string',
      title: '最小宽度',
    },
    minHeight: {
      type: 'string',
      title: '最小高度',
    },
    flexWrap: {
        type: 'string',
        title: '布局-是否换行'
    },
    flexDirection:{
        type: 'string',
        title: '布局-横排'
    },
    justifyContent:{
        type: 'string',
        title: '布局-水平',
        
    },
    alignContent:{
        type: 'string',
        title: '布局-垂直',
        
    },
    fontSize: {
      type: 'string',
      title: '字体大小',
    },
    color: {
      type: 'string',
      title: '字体颜色',
    },
    background: {
      type: 'string',
      title: '背景色',
    },
    backgroundImage: {
      type: 'string',
      title: '背景图片',
    },
    margin: {
      type: 'string',
      title: '外边距',
    },
    padding: {
      type: 'string',
      title: '内边距',
    },
    borderWidth: {
      type: 'string',
      title: '边框宽度',
    },
    borderColor: {
      type: 'string',
      title: '边框颜色',
    },
    borderStyle: {
      type: 'string',
      title: '边框样式',
    },
    borderRadius: {
      type: 'string',
      title: '圆角',
    }
  },
};
const uiSchema:FormProps<any>['uiSchema'] = {
  width: {
    'ui:widget': 'SizeInput',
  },
  height: {
    'ui:widget': 'SizeInput',
  },
  minWidth: {
    'ui:widget': 'SizeInput',
  },
  minHeight: {
    'ui:widget': 'SizeInput',
  },
  fontSize: {
    'ui:widget': 'SizeInput',
  },
  flexWrap: {
    'ui:field': 'Select',
    'ui:options':{
      labels: [
        {
          value: 'nowrap',
          label: '不换行',
        },
        {
            value: 'wrap',
            label: '换行',
        },
    ]
    }
  },
  flexDirection: {
    'ui:field': 'Select',
    'ui:options':{
      labels: [
        {
          value: 'row',
          label: '横排',
        },
        {
            value: 'column',
            label: '竖排',
        },
    ]
    }
  },
  justifyContent: {
    'ui:field': 'Select',
    'ui:options':{
      labels: [
        {
          value: 'flex-start',
          label: '行首开始',
        },
        {
            value: 'flex-end',
            label: '行尾开始',
        },
        {
            value: 'center',
            label: '水平居中',
        },
        {
            value: 'space-between',
            label: '不含首尾均匀分配',
        },
        {
            value: 'space-around',
            label: '含首尾均匀分配',
        },
    ]
    }
  },
  alignContent: {
    'ui:field': 'Select',
    'ui:options':{
      labels: [
        {
          value: 'flex-start',
          label: '顶部开始',
        },
        {
            value: 'flex-end',
            label: '底部开始',
        },
        {
            value: 'center',
            label: '垂直居中',
        },
        {
            value: 'space-between',
            label: '不含顶底均匀分配',
        },
        {
            value: 'space-around',
            label: '含顶底均匀分配',
        },
    ]
    }
  },  
  color: {
    'ui:widget': 'ColorInput',
  },
  background: {
    'ui:widget': 'ColorInput',
  },
  backgroundImage: {
    'ui:widget': 'CssImageInput',
  },
  margin: {
    'ui:field': 'BoxStyleSetter',
    'ui:options':{
      labels,
    }
  },
  padding: {
    'ui:field': 'BoxStyleSetter',
    'ui:options':{
      labels,
    }
  },
  borderWidth: {
    'ui:field': 'BoxStyleSetter',
    'ui:options':{
      labels,
    }
  },
  borderColor: {
    'ui:widget': 'ColorInput',
  },
  borderRadius: {
    'ui:field': 'BoxStyleSetter',
    'ui:options':{
      labels:[
        {
          icon: 'TopLeft',
          title: '左上',
        },
        {
          icon: 'TopRight',
          title: '右上',
        },
        {
          icon: 'BottomRight',
          title: '右下',
        },
        {
          icon: 'BottomLeft',
          title: '左下',
        },
      ],
    }
  },
  borderStyle: {
    'ui:field': 'Select',
    'ui:options':{
      labels: [
        {
          value: 'none',
          label: 'None',
        },
        ...['solid','dotted','dashed'].map(v=>{
          return {
            value:v,
            label:<div style={{ border: '2px '+v,
            position: 'absolute',
            width:'90%',
            top: ' 50%',
            transform: 'translateY(-50%)', }}></div>
          }
        })
      ],
    }
  },
};
export const StyleSetter:Field = (props) => {
  return (
    <Style.Box>
      <Collapse ghost>
        <Collapse.Panel header={props.schema.title || props.name} key="1">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formContext={props.formContext}
            formData={props.formData}
            liveValidate={true}
            onChange={(e) => {
              props.onChange(e.formData);
            }}
          ><div></div></Form>
        </Collapse.Panel>
      </Collapse>
    </Style.Box>
  );
};
