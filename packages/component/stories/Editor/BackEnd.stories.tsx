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
      '0176b99d-e07a-4be7-bf6a-676e254b7bbe': {
        id: '0176b99d-e07a-4be7-bf6a-676e254b7bbe',
        formData: {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
          },
        },
        key: 'Card',
      },
      'c2337eda-2963-4eea-b8d0-cd2ef32ef660': {
        id: 'c2337eda-2963-4eea-b8d0-cd2ef32ef660',
        formData: {
          width: '100%',
          height: 'inherit',
          src: 'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
        },
        key: 'Image',
      },
      'fff590b3-1d59-4a29-9dc9-6d345b70f429': {
        id: 'fff590b3-1d59-4a29-9dc9-6d345b70f429',
        formData: {
          width: '100%',
          height: 'inherit',
          src: 'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
        },
        key: 'Image',
      },
      '8440bc6d-05e0-4e99-963d-fc8e71b999cc': {
        id: '8440bc6d-05e0-4e99-963d-fc8e71b999cc',
        formData: {
          width: '100%',
          height: 'inherit',
          src: 'http://static.ixiaochuan.cn/hiya-version_test/c57fbd56c2c08328f7bb.png',
        },
        key: 'Image',
      },
      '228890c4-1a32-44b9-a09f-0e08858f4306': {
        id: '228890c4-1a32-44b9-a09f-0e08858f4306',
        formData: {
          text: '占位文本',
          style: {},
        },
        key: 'Text',
      },
    },
    layout: [
      {
        key: '0176b99d-e07a-4be7-bf6a-676e254b7bbe',
        children: [
          {
            key: 'c2337eda-2963-4eea-b8d0-cd2ef32ef660',
            children: [],
          },
          {
            key: 'fff590b3-1d59-4a29-9dc9-6d345b70f429',
            children: [],
          },
          {
            key: '8440bc6d-05e0-4e99-963d-fc8e71b999cc',
            children: [],
          },
        ],
      },
      {
        key: '228890c4-1a32-44b9-a09f-0e08858f4306',
        children: [],
      },
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

