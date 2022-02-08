import React, { useEffect, useState,ReactChild } from 'react';
import * as Style from './style';
export interface Props {
  tab: string[];
  tabIndex: number;
  children:{
    [key in Props['tabIndex']]:ReactChild
  },
  TabsStyle:React.CSSProperties
  TabsItemStyle:React.CSSProperties
  TabsItemActiveStyle:React.CSSProperties
}
export function Index(props: Props) {
  const [tabIndex, setTabIndex] = useState(props.tabIndex);
  useEffect(() => {
    setTabIndex(props.tabIndex);
  }, [props.tabIndex]);
  return (
    <>
      <Style.Tabs css={{
        ...props.TabsStyle
      }}>
        {props.tab.map((v, i) => {
          return (
            <Style.TabsItem
              key={i}
              onClick={() => {
                setTabIndex(i)
              }}
              css={{
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

