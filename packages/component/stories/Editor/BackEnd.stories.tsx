import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BackEnd,BackEndPropsType } from '../../src/Editor/BackEnd/index';

const meta: Meta = {
  title: 'Editor/BackEnd',
  component: BackEnd,
  argTypes: {
  },
  parameters: {
    // controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BackEndPropsType> = args => <div style={{margin:'-1rem',height:'100vh'}}><BackEnd {...args} /></div>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  'iframe':`${window.location.origin}/iframe.html?id=editor-frontend--default&args=&viewMode=story`
};