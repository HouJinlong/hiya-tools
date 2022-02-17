import React, { useRef, useState, useEffect } from 'react';
import { Layout, Card, Button } from 'antd';

import 'antd/dist/antd.css';
import { useMessageRef, EditorContext } from '../EditorContext';
import * as Style from './style';
// import phonePng from './phone.png';

import { ComponentBox } from './component/ComponentBox';
import { AttributeBox } from './component/AttributeBox';
import { TreeBox } from './component/TreeBox';
import { ToolBox } from './component/ToolBox';
import { IconWidget } from '../../IconWidget';
export interface BackEndPropsType {
  iframe: string;
  data: any;
  onSave: any;
  onView:any;
  UploadProps:any
}
const leftSiderButton = {
  Component: {
    title: '组件',
    Component: <ComponentBox />,
  },
  Outline: {
    title: '结构',
    Component: <TreeBox />,
  },
  History: {
    title: '修改历史',
    Component: <div>1</div>,
  },
};
const leftSiderButtonKeys = Object.keys(
  leftSiderButton
) as (keyof typeof leftSiderButton)[];
export function BackEnd(props: BackEndPropsType) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const data = useMessageRef(iframe);
  useEffect(() => {
    if (data.message.postMessage) {
      data.Action.syncEditData(props.data);
    }
  }, [data.message.postMessage, props.data]);
  const [leftSider, setLeftSider] = useState(leftSiderButtonKeys[0]);
  return (
    <EditorContext.Provider value={data}>
      <Layout
        style={{
          height: '100%',
        }}
      >
        <Layout.Sider theme="light">
          <Style.scrollBox>
            <Card title={leftSiderButton[leftSider].title} size="small">
              {leftSiderButton[leftSider].Component}
            </Card>
          </Style.scrollBox>
        </Layout.Sider>
        <Layout.Sider theme="light" width="40">
          {leftSiderButtonKeys.map((v) => {
            return (
              <Button
                key={v}
                type={v === leftSider ? 'primary' : 'default'}
                size="large"
                icon={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconWidget
                      title={leftSiderButton[v].title}
                      icon={v}
                      placement="right"
                    ></IconWidget>
                  </div>
                }
                onClick={() => {
                  setLeftSider(v);
                }}
              />
            );
          })}
        </Layout.Sider>
        <Layout.Content
          style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          <ToolBox {...props}></ToolBox>
          <Style.EditBox
            style={
              {
                // backgroundImage: `url(${phonePng})`,
              }
            }
          >
              <Style.EditBoxIframe
                ref={iframe}
                src={props.iframe}
              ></Style.EditBoxIframe>
          </Style.EditBox>
        </Layout.Content>
        <Layout.Sider theme="light" width="300">
          <Style.scrollBox>
            <Card title="属性编辑区" size="small">
              <AttributeBox {...props} />
            </Card>
          </Style.scrollBox>
        </Layout.Sider>
      </Layout>
    </EditorContext.Provider>
  );
}
