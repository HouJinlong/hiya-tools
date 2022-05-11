import React, { useContext } from 'react';
import { Meta, Story } from '@storybook/react';
import { FrontEnd } from '../../src/Editor/FrontEnd/index';
import * as Component from '../../src/Component';
import { RenderViewContext } from '../../src/Editor/RenderView';
const meta: Meta = {
  title: 'Editor/FrontEnd',
  component: FrontEnd,
  argTypes: {},
  parameters: {
    // controls: { expanded: true },
  },
};

export default meta;

const Warp = ({ children }) => {
  const data = useContext(RenderViewContext);
  console.log('Warp', data);
  return <div style={{ color: 'red' }}>{children}</div>;
};

const Template: Story<any> = (args) => (
  <div style={{ margin: '-1rem' }}>
    <FrontEnd
      Components={{
        Card: Component.CardComponent,
        Image: Component.ImageComponent,
        Text:Component.TextComponent,
        Tab: Component.TabComponent,
        CustomComponent: Component.CustomComponent,
      }}
      Warp={Warp}
      EditDataStateOther={{
        CustomComponents:[
            {
                "value": "Test",
                "label": "测试组件"
            },
            {
                "value": "Alert",
                "label": "弹框组件"
            }
        ]
      }}
      other={
        {
          CustomComponents:{
            Test: {
              name: '测试组件',
              Component: () => <div>测试组件</div>,
            },
            Alert: {
              name: '弹框组件',
              Component: () => <div>弹框组件</div>,
            },
          }
        }
      }
    />
  </div>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

