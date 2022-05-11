import React, { useContext } from 'react';
import { Empty } from 'antd';
import * as Style from './style';
import { Form } from '../../../../ReactJsonschemaForm';
import { BackEndPropsType } from '../../index';
import { BackEndEditorContext } from '../../../EditorContext';
export function AttributeBox(props: BackEndPropsType) {
  const { selectInfo, EditDataDispatch } = useContext(BackEndEditorContext);
  return (
    <Style.AttributeBox>
      {selectInfo ? (
        <Form
          key={selectInfo.data.id}
          schema={selectInfo.componentInfo.schema}
          uiSchema={selectInfo.componentInfo.uiSchema}
          showErrorList={false}
          formData={selectInfo.data.formData}
          formContext={{
            UploadProps: props.UploadProps,
          }}
          onChange={(e) => {
            if (e.errors.length == 0) {
              if (
                JSON.stringify(selectInfo.data.formData) !==
                JSON.stringify(e.formData)
              ) {
                EditDataDispatch({
                  type: 'update',
                  data: {
                    ...selectInfo.data,
                    formData: e.formData,
                  },
                });
              }
            }
          }}
        >
          <div></div>
        </Form>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无内容" />
      )}
    </Style.AttributeBox>
  );
}
