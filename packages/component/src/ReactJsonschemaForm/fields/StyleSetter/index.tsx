import React from 'react';
import { Collapse } from 'antd';
import * as Style from './style';
import { Form } from '../../Form';
import { FormProps,FieldTemplateProps} from '@rjsf/core';
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

const FlexSchema = {
  schema:{
    flexDirection:{
        type: 'string',
        title: '布局-主轴',
    },
    flexWrap: {
        type: 'string',
        title: '布局-换行'
    },
    justifyContent:{
        type: 'string',
        title: '布局-主轴对齐',
    },
    alignItems:{
        type: 'string',
        title: '布局-辅轴对齐',
    },
  },
  uiSchema:{
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
      },
      'ui:help':"子元素按哪个轴排列",
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
    justifyContent: {
      'ui:field': 'Select',
      'ui:options':{
        labels: [
          {
            value: 'flex-start',
            label: '首开始',
          },
          {
              value: 'flex-end',
              label: '尾开始',
          },
          {
              value: 'center',
              label: '居中',
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
    alignItems: {
      'ui:field': 'Select',
      'ui:options':{
        labels: [
          {
            value: 'flex-start',
            label: '首开始',
          },
          {
              value: 'flex-end',
              label: '尾开始',
          },
          {
              value: 'center',
              label: '居中',
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
  }
}

const FontSchema = {
  schema:{
    fontSize: {
      type: 'string',
      title: '字体-大小',
    },
    color: {
      type: 'string',
      title: '字体-颜色',
    },
    lineHeight: {
      type: 'string',
      title: '字体-行高',
    },
    textAlign: {
      type: 'string',
      title: '字体-对齐',
      default:'center'
    },
  },
  uiSchema:{
    fontSize: {
      'ui:widget': 'SizeInput',
    },
    lineHeight:{
      'ui:widget': 'SizeInput',
    },
    color: {
      'ui:widget': 'ColorInput',
    },
    textAlign:{
      'ui:field': 'Select',
      'ui:options':{
        labels: [
            {
              value: 'left',
              label: '左',
            },
            {
                value: 'right',
                label: '右',
            },
            {
              value: 'center',
              label: '居中',
          },
        ]
      },
    }
  }
}

const BgSchema = {
  schema:{
    bg: {
      type: 'string',
      title: '背景',
    },
  },
  dependencies:{
    bg:{
      oneOf: [
        {
          properties: {
            bg: {
              enum: ['渐变色'],
            },
            background: {
              type: 'string',
              title: '背景-渐变色',
            },
          },
        },
        {
          properties: {
            bg: {
              enum: ['颜色图片'],
            },
            backgroundColor: {
              type: 'string',
              title: '背景-颜色',
            },
            backgroundImage: {
              type: 'string',
              title: '背景-图片',
            },
            backgroundRepeat : {
              type: 'string',
              title: '背景-重复',
              default:'no-repeat'
            },
            backgroundSize:{
              type: 'string',
              title: '背景-尺寸',
              default:'100% 100%'
            },
            backgroundPosition:{
              type: 'string',
              title: '背景-位置',
              default:'center'
            },
          },
        },
      ],
    },
  },
  uiSchema:{
    bg:{
      'ui:field': 'Select',
      'ui:options':{
        labels: [
          {
            value: '渐变色',
            label: '渐变色',
          },
          {
            value: '颜色图片',
            label: '颜色图片',
          }
        ],
      }
    },
    background: {
      'ui:widget': 'ColorInput',
    },
    backgroundColor: {
      'ui:widget': 'ColorInput',
    },
    backgroundImage: {
      'ui:widget': 'CssImageInput',
    },
    backgroundRepeat: {
      'ui:field': 'Select',
      'ui:options':{
        labels: [
          {
            value: 'repeat',
            label: '垂直和水平',
          },
          {
            value: 'repeat-x',
            label: '水平',
          },
          {
            value: 'repeat-x',
            label: '垂直',
          },
          {
            value: 'no-repeat',
            label: '不重复',
          }
        ],
      }
    },
    backgroundSize: {
    },
    backgroundPosition:{}
  },
}
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
    ...FlexSchema.schema,
    ...FontSchema.schema,
    ...BgSchema.schema,
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
  dependencies: {
    ...BgSchema.dependencies
  }
};
const uiSchema:FormProps<any>['uiSchema'] = {
  "ui:order":['width', 'height', 'minWidth', 'minHeight', ...Object.keys(FlexSchema.schema), ...Object.keys(FontSchema.schema),...Object.keys(BgSchema.uiSchema),'margin', 'padding', 'borderWidth', 'borderColor', 'borderStyle', 'borderRadius'],
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
  ...FlexSchema.uiSchema,
  ...FontSchema.uiSchema,
  ...BgSchema.uiSchema,
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
export const StyleSetter = (props:FieldTemplateProps<any>) => {
  const {open=false} = (props.uiSchema['ui:options']||{} )as any;
  return (
    <Style.Box>
      <Collapse ghost defaultActiveKey={open?['1']:[]}>
        <Collapse.Panel header={props.schema.title} key="1">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formContext={{
              ...props.formContext,
              ...{
                labelCol: { span: 10},
                wrapperCol: { span: 14 },
              }
            }}
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
