import React, { useContext, useMemo } from 'react';
import { RenderViewContext } from '../../Editor/RenderView';
export const CustomComponent = (props: any) => {
  const {CustomComponents} = useContext(RenderViewContext);
  const CustomComponent = useMemo(()=>{
      return CustomComponents[props.CustomComponentKey]?.Component
  },[props.CustomComponentKey])
  console.log(CustomComponent);
  return CustomComponent?<CustomComponent />:<div></div>;
};
