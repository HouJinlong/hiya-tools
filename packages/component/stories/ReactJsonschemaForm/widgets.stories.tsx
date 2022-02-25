import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '../../src/ReactJsonschemaForm';
import { Input, Row, Col } from 'antd';
import { useEffect, useState } from '@storybook/addons';
const meta: Meta = {
  title: 'React Jsonschema Form/widgets',
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
const Template: Story<Props> = function (args) {
  const [formData, setFormData] = useState(args.formData || {});
  useEffect(() => {
    setFormData(args.formData);
  }, [args.formData]);
  return (
    <Row>
      <Col span={8}>
        <Input.TextArea
          autoSize={true}
          value={JSON.stringify(formData, null, 2)}
        ></Input.TextArea>
      </Col>
      <Col span={16}>
        <Form
          formContext={{
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          }}
          liveValidate={true}
          {...args}
          formData={formData}
          onChange={(e) => {
            setFormData(e.formData);
          }}
        >
          <div></div>
        </Form>
      </Col>
    </Row>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const ColorInput = Template.bind({});

ColorInput.args = {
  schema: {
    type: 'object',
    properties: {
      color: {
        type: 'string',
        title: '颜色'
      },
      color1: {
        type: 'string',
        title: '颜色',
      },
      color2: {
        type: 'string',
        title: '颜色',
      },
      color3: {
        type: 'string',
        title: '颜色',
      },
      color4: {
        type: 'string',
        title: '颜色',
      },
    },
  },
  uiSchema: {
    color: {
      'ui:widget': 'ColorInput',
    },
    color1: {
      'ui:widget': 'ColorInput',
    },
    color2: {
      'ui:widget': 'ColorInput',
    },
    color3: {
      'ui:widget': 'ColorInput',
    },
    color4: {
      'ui:widget': 'ColorInput',
    },
  },
  formData: {
    color: '',
    color1: 'red',
    color2: '#000',
    color3: 'linear-gradient(180deg, #B9E2FB 0%, #A291FF 38.02%, #7155FF 100%)',
    color4: 'rgba(255,255,255,.5)',
  },
};


export const ImageInput = Template.bind({});

ImageInput.args = {
    schema: {
      type: 'object',
      properties: {
        ImageInput: {
          type: 'string',
          title: '图片地址',
        },
        CssImageInput: {
            type: 'string',
            title: 'css图片地址',
          },
      },
    },
    uiSchema: {
      ImageInput: {
        'ui:widget': 'ImageInput',
        UploadProps:{
          customRequest:(props)=>(obj) => console.log('obj: ', obj,props),
        }
      },
      CssImageInput: {
        'ui:widget': 'CssImageInput',
      },
    },
    formData: {
      ImageInput: 'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
      CssImageInput:'url(http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png)'
    },
};


export const SizeInput = Template.bind({});

SizeInput.args = {
    schema: {
      type: 'object',
      properties: {
        width: {
          type: 'string',
          title: '宽度',
        },
        height: {
            type: 'string',
            title: '宽度',
        },
        minHeight: {
            type: 'string',
            title: '宽度',
        },
      },
    },
    uiSchema: {
      width: {
        'ui:widget': 'SizeInput',
      },
      height: {
        'ui:widget': 'SizeInput',
      },
      minHeight:{
        'ui:widget': 'SizeInput',
      },
    },
    formData: {
        width:'auto',
        height:'100px',
        minHeight:'100%'
    },
};


export const TextareaWidget = Template.bind({});

TextareaWidget.args = {
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          title: '文本',
          default: '占位文本',
        },
      },
    },
    uiSchema: {
      text: {
        'ui:widget': 'textarea',
        'ui:options':{
          rows:'4',
          style:{
            direction: 'rtl'
          }
        }
      },
    },
    formData: {
    },
};


