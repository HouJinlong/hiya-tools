import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form } from '../../src/ReactJsonschemaForm';
import { Input, Row, Col } from 'antd';
import { useEffect, useState } from '@storybook/addons';
const meta: Meta = {
  title: 'React Jsonschema Form/fields',
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
export const BoxStyleSetter = Template.bind({});
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
BoxStyleSetter.args = {
  schema: {
    type: 'object',
    properties: {
      margin: {
        type: 'string',
        title: '外边距',
      },
      margin1: {
        type: 'string',
        title: '外边距',
      },
      margin2: {
        type: 'string',
        title: '外边距',
      },
    },
  },
  uiSchema: {
    margin: {
      'ui:field': 'BoxStyleSetter',
      'ui:options':{
        labels,
      }
    },
    margin1: {
      'ui:field': 'BoxStyleSetter',
      'ui:options':{
        labels,
      }
    },
    margin2: {
      'ui:field': 'BoxStyleSetter',
      'ui:options':{
        labels,
      }
    },
  },
  formData: {
    margin: '',
    margin1: '10px',
    margin2: '10px 10px 10px 10px',
  },
};



export const StyleSetter = Template.bind({});
StyleSetter.args = {
  schema: {
    type: 'object',
    properties: {
      style:{
        type:'object',
        title:'样式'
      }
    },
  },
  uiSchema: {
      "style":{
        "ui:field": "StyleSetter",
        'ui:options':{
          open:true
        }
      }
  },
  formData: {
    "style": {
      "width": "100px",
      "height": "0px",
      "minWidth": "0px",
      "minHeight": "0px",
      "flexWrap": "nowrap",
      "flexDirection": "column",
      "justifyContent": "flex-end",
      "alignContent": "flex-end",
      "fontSize": "0px",
      "color": "rgba(67,42,192,1)",
      "background": "rgba(77,77,77,1)",
      "backgroundImage": "url(111)",
      "margin": "10px 10px 10px 10px",
      "padding": "10px 10px 10px 10px",
      "borderWidth": "10px 0px 0px 0px",
      "borderColor": "rgba(70,69,78,1)",
      "borderStyle": "solid",
      "borderRadius": "0px 0px 25px 0px"
    }
  },
};



export const DatePicker = Template.bind({});

DatePicker.args = {
    schema: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
        },
        month: {
          type: 'string',
        },
        valueFormat: {
            type: 'string',
        }
      },
    },
    uiSchema: {
      date: {
        'ui:field': 'DatePicker',
        'ui:options':{
          picker:'date',
          showTime:true
        }
      },
      month: {
        'ui:field': 'DatePicker',
        'ui:options':{
          picker:'month'
        }
      },
      valueFormat: {
        'ui:field': 'DatePicker',
        'ui:options':{
          format:'YYYY-MM-DD',
          valueFormat:"X"
        }
      },
    },
    formData: {

    },
};
  

export const RangePicker = Template.bind({});

RangePicker.args = {
    schema: {
      type: 'object',
      properties: {
        time: {
            type: 'array',
        },
        valueFormat: {
            type: 'array',
        }
      },
    },
    uiSchema: {
      valueFormat: {
        'ui:field': 'RangePicker',
        'ui:options':{
          valueFormat:'X'
        }
      },
      time: {
        'ui:field': 'RangePicker',
        'ui:options':{
          showTime:true
        }
      },
      
    },
    formData: {
    },
};



export const Select = Template.bind({});

Select.args = {
    schema: {
      type: 'object',
      properties: {
        borderStyle: {
            type: 'string',
            title: '边框样式'
        },
        enable_areas:{
          "type": "array",
          "title": "生效地区",
        }
      },
    },
    uiSchema: {
      borderStyle: {
        'ui:field': 'Select',
        'ui:options':{
          labels: [
                  {
                    value: 'none',
                    label: 'None',
                  },
                  {
                    value: 'solid',
                    label: (
                      <div
                        style={{
                          border: '2px solid',
                          position: 'absolute',
                          width:'100%',
                          top: ' 50%',
                          transform: 'translateY(-50%)',
                        }}
                      ></div>
                    ),
                  },
                  {
                    value: 'dotted',
                    label: <div style={{ border: '2px dotted',
                    position: 'absolute',
                    width:'100%',
                    top: ' 50%',
                    transform: 'translateY(-50%)', }}></div>,
                  },
                  {
                    value: 'dashed',
                    label: <div style={{ border: '2px dashed',
                    position: 'absolute',
                    width:'100%',
                    top: ' 50%',
                    transform: 'translateY(-50%)', }}></div>,
                  },
          ],
        }
      },
      enable_areas:{
        'ui:field': 'Select',
        'ui:options':{
          labels:[
            {
                "label": "中东区",
                "value": 0
            },
            {
                "label": "印尼区",
                "value": 1
            },
            {
                "label": "越南区",
                "value": 2
            },
            {
                "label": "菲律宾区",
                "value": 3
            },
            {
                "label": "马来西亚区",
                "value": 4
            },
            {
                "label": "泰国区",
                "value": 5
            },
            {
                "label": "印度区",
                "value": 6
            },
            {
                "label": "巴基斯坦区",
                "value": 7
            }
        ],
        mode:"multiple"
        }
      }
    },
    formData: {
    },
};