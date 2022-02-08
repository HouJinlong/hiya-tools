import React, { useContext, useEffect } from 'react';
import { EditorContext } from '../../../EditorContext';
import { Space,Button,Tooltip,message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
const key = 'Editor'
export function ToolBox() {
  const data = useContext(EditorContext);
  useEffect(()=>{
    if(!data.isReady){return}
    const editData = window.localStorage.getItem(key)
    if(editData){
      data.Action.syncEditData(JSON.parse(editData))
    }
  },[data.isReady])
  return <div style={{textAlign:'center',padding:'30px'}}>
    <Space>
      {
        [{
          text:'保存',
          icon:<SaveOutlined />,
          fn:()=>{
            window.localStorage.setItem(key,JSON.stringify(data.GlobalData.editData))
            message.success('保存成功');
          }
        }].map(v=>{
          return (
            <Tooltip placement="bottom" title={v.text} key={v.text} >
              <Button icon={v.icon} onClick={()=>{
                v.fn()
              }}></Button>
            </Tooltip>
          )
        })
      }
    </Space>
  </div>;
}
