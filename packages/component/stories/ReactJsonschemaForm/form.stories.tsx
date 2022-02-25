import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '../../src/ReactJsonschemaForm';
import { Input, Row, Col } from 'antd';
import { useEffect, useState } from '@storybook/addons';
const meta: Meta = {
  title: 'React Jsonschema Form/Form',
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
  const S = args.getS(formData)
  return (
    <Row>
      <Col span={8}>
        <Input.TextArea
          autoSize={true}
          style={{
            width:'90%'
          }}
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
          {...S}
          formData={formData}
          onChange={(e) => {
            console.log(111);
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
export const Default = Template.bind({});
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
Default.args = {
  getS:(a)=>{
    console.log('a',a);
    return {
      schema: {
        type: 'object',
        properties: {
          margin: {
            type: 'string',
            title: '外边距',
          },
          color: {
            type: 'string',
            title: '颜色',
          },
          style:{
            type:'object',
            title:'样式'
          }
        },
      },
      uiSchema: {
        margin: {
          'ui:field': 'BoxStyleSetter',
          'ui:options':{
            labels,
          }
        },
        color: {
          'ui:widget': 'ColorInput',
        },
        "style":{
          "ui:field": "StyleSetter"
        }
      }
    }
  },
  formData: {
    margin: '',
    margin1: '10px',
    margin2: '10px 10px 10px 10px',
  },
};


