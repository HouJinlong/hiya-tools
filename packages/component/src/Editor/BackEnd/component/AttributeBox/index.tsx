import React, { useContext } from 'react';
import { EditorContext } from '../../../EditorContext';
import { Empty } from 'antd';
import * as Style from './style';
import { Form } from '../../../../ReactJsonschemaForm';
import { BackEndPropsType } from '../../index';
export function AttributeBox(props:BackEndPropsType) {
  const {Action,select} = useContext(EditorContext);
  return (
    <Style.AttributeBox>
      {select?(
        <Form
          key={select.editComponent.id}
          schema={select.component.schema}
          uiSchema={select.component.uiSchema}
          showErrorList={false}
          formData={select.editComponent.formData}
          formContext={{
            UploadProps: props.UploadProps,
          }}
          onChange={(e)=>{
            if(e.errors.length==0){
              if(JSON.stringify(select.editComponent.formData)!==JSON.stringify(e.formData)){
                Action.update({
                  ...select.editComponent,
                  formData: e.formData,
                })
              }
            }
          }}
        ><div></div></Form>
      ):<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无内容" />}
    </Style.AttributeBox>
  );
}
