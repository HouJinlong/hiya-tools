import React, { useEffect, useState,ReactChild, useContext } from 'react';
import { RenderViewContext } from '../../Editor/RenderView';
export interface TabProps {
  tabIndex: string;
  children:{
    [key in TabProps['tabIndex']]:ReactChild
  },
  TabsStyle:React.CSSProperties
  TabsItemStyle:React.CSSProperties
  TabsItemActiveIsEqually:boolean
  TabsItemActiveStyle?:React.CSSProperties
  TabsAndStyles?:Array<{text:string,ActiveStyle:React.CSSProperties}>
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
        transform: 'translate3d(0, 0, 0)',
        ...props.TabsStyle,
      }}>
        {
          (props.TabsAndStyles||[]).map((v, _i) => {
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
                  ...Object(tabIndex === i ?{
                    ...props.TabsItemActiveStyle,
                    ...v.ActiveStyle
                  }:{
                  })
                }}
              >
                {v.text}
              </div>
            );
          })
        }
      </div>
      {props.children[tabIndex]}
    </>
  );
}

