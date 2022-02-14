import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Card,CardProps,CardDefaultStyle } from '../../src/Component/Card';
const childrenMap = {
  '俩个文字块':<><div style={{color:'red'}} >文字块文字块文字块文字块文字块文字块文字块文字块文字块文字块文字块</div><div style={{color:'black'}}>文字块文字块文字块文字块文字块文字块文字块文字块文字块文字块文字块</div></>,
  '自适应图片':<img width="100%" src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"></img>
}
const meta:Meta = {
  title: 'Component /Card-布局块',
  argTypes: {
    children: {
      options: Object.keys(childrenMap),
      mapping:childrenMap,
      control: { type: 'select' },
    },
    background:{
      control: { type: 'color' },
    }
  },
};
export default meta

const Template: Story<CardProps> = args =><div style={{margin:'-1rem',height:'100vh'}}><Card {...args} /></div>;;

export const Default = Template.bind({});
Default.args = {
  ...CardDefaultStyle,
  children:Object.keys(childrenMap)[0]
};
