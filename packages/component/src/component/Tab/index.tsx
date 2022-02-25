import React, { useEffect, useState,ReactChild, useContext } from 'react';
import { RenderViewContext } from '../../Editor/RenderView';
export interface TabProps {
  tab: string[];
  tabIndex: string;
  children:{
    [key in TabProps['tabIndex']]:ReactChild
  },
  TabsStyle:React.CSSProperties
  TabsItemStyle:React.CSSProperties
  TabsItemActiveStyle:React.CSSProperties
}
export function Tab(props: TabProps) {
  const data = useContext(RenderViewContext)
  console.log('Tab: ', data);
  const [tabIndex, setTabIndex] = useState(props.tabIndex);
  useEffect(() => {
    setTabIndex(props.tabIndex);
  }, [props.tabIndex]);
  return (
    <>
      <div className='ToyBricks-Tab' style={{
        display:'flex',
        alignItems:'center',
        ...props.TabsStyle,
      }}>
        {props.tab.map((v, _i) => {
          const i = String(_i)
          return (
            <div
              className='ToyBricks-Tab-Item'
              key={i}
              onClick={() => {
                setTabIndex(i)
              }}
              style={{
                flexShrink: 0,
                boxSizing:'border-box',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                ...props.TabsItemStyle,
                ...Object(tabIndex === i ? props.TabsItemActiveStyle:{
                })
              }}
            >
              {v}
            </div>
          );
        })}
      </div>
      {props.children[tabIndex]}
    </>
  );
}

