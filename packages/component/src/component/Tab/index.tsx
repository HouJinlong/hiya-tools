import React, { useEffect, useState,ReactChild } from 'react';
import * as Style from './style';
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
  const [tabIndex, setTabIndex] = useState(props.tabIndex);
  useEffect(() => {
    setTabIndex(props.tabIndex);
  }, [props.tabIndex]);
  return (
    <>
      <Style.Tabs style={props.TabsStyle}>
        {props.tab.map((v, _i) => {
          const i = String(_i)
          return (
            <Style.TabsItem
              key={i}
              onClick={() => {
                setTabIndex(i)
              }}
              style={{
                ...props.TabsItemStyle,
                ...Object(tabIndex === i ? props.TabsItemActiveStyle:{})
              }}
            >
              {v}
            </Style.TabsItem>
          );
        })}
      </Style.Tabs>
      {props.children[tabIndex]}
    </>
  );
}

