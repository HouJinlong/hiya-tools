import React, { useContext } from 'react';
import { EditorContext } from '../../../EditorContext';
import { Empty } from 'antd';
import * as Style from './style';
import { Form } from '../../../../ReactJsonschemaForm';
export function AttributeBox() {
  const {Action,select} = useContext(EditorContext);
  return (
    <Style.AttributeBox>
      {select?(
        <Form
          schema={select.component.schema}
          uiSchema={select.component.uiSchema}
          showErrorList={false}
          formData={select.editComponent.formData}
          onChange={(e)=>{
            if(e.errors.length==0){
              Action.update({
                ...select.editComponent,
                formData: e.formData,
              })
            }
          }}
        ><div></div></Form>
      ):<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无内容" />}
    </Style.AttributeBox>
  );
}
