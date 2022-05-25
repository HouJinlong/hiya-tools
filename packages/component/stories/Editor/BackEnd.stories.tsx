import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BackEnd, BackEndPropsType } from '../../src/Editor/BackEnd/index';
import { useRef, useState } from '@storybook/addons';

const meta: Meta = {
  title: 'Editor/BackEnd',
  component: BackEnd,
  argTypes: {},
  parameters: {
    // controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BackEndPropsType> = (args) => {
  const [config, SetConfig] = useState({
    s: 1,
  });
  const [data, setData] = useState({
    components: {
      "d3c4f0e0-0b33-4da6-b762-5b16a7f9c494": {
          "id": "d3c4f0e0-0b33-4da6-b762-5b16a7f9c494",
          "formData": {
              "tabIndex": "1",
              "TabsStyle": {},
              "TabsItemStyle": {},
              "TabsItemActiveStyle": {},
              "TabsAndStyles": [
                  {
                      "text": "测试"
                  },
                  {
                      "text": "测试2"
                  }
              ]
          },
          "key": "Tab"
      },
      "3700bcfa-72b0-407a-9c06-b662d0dc4864": {
          "id": "3700bcfa-72b0-407a-9c06-b662d0dc4864",
          "formData": {
              "width": "100%",
              "height": "inherit",
              "src": "http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png"
          },
          "key": "Image"
      },
      "5bb67596-818b-47cc-bb43-9388f3d87ef1": {
          "id": "5bb67596-818b-47cc-bb43-9388f3d87ef1",
          "formData": {
              "text": "占位文本",
              "style": {}
          },
          "key": "Text"
      },
      "cbbe2eb4-937f-4ebf-9ba7-0d555c8c05df": {
          "id": "cbbe2eb4-937f-4ebf-9ba7-0d555c8c05df",
          "formData": {
              "text": "占位文本",
              "style": {}
          },
          "key": "Text"
      }
  },
    layout: [
      {
          "key": "d3c4f0e0-0b33-4da6-b762-5b16a7f9c494",
          "children": [
              {
                  "key": "0",
                  "children": [
                      {
                          "key": "3700bcfa-72b0-407a-9c06-b662d0dc4864",
                          "children": []
                      },
                      {
                          "key": "5bb67596-818b-47cc-bb43-9388f3d87ef1",
                          "children": []
                      }
                  ]
              },
              {
                  "key": "1",
                  "children": [
                      {
                          "key": "cbbe2eb4-937f-4ebf-9ba7-0d555c8c05df",
                          "children": []
                      }
                  ]
              }
          ]
      }
  ],
  });
  return (
    <div style={{ margin: '-1rem', height: '100vh' }}>
      <BackEnd
        iframe={`http://127.0.0.1:6006/iframe.html?id=editor-frontend--default&args=&viewMode=story`}
        onSave={(e) => {
          console.log('2222: ', e);
        }}
        onView={() => {
          return '测试预览';
        }}
        ToolBoxSlot={
          <div
            onClick={() => {
              SetConfig(() => {
                return {
                  s: config.s + 1,
                };
              });
            }}
          >
            {config.s}
          </div>
        }
        defaultData={data}
        EditDataStateOther={{
          customData: config,
        }}
      />
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

