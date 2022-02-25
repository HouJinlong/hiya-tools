import React, { useContext } from 'react';
import { List } from 'antd';
import { EditorContext } from '../../../EditorContext';
export function HistoryBox() {
  const { editDataHistory,setEditDataHistory,setGlobalDataSync } = useContext(EditorContext);
    return   <List
        size="small"
        style={{
            margin:'-13px'
        }}
        bordered
        dataSource={editDataHistory.data}
        renderItem={(item:any,index) => <List.Item style={{
            fontSize:'12px',
            color: index+1===editDataHistory.index?'#1890ff':'',
            opacity:index+1>editDataHistory.index?'.5':'1',
            cursor: 'pointer'
        }} onClick={()=>{
            setEditDataHistory((pre:any)=>{
                return {
                    ...pre,
                    index:index+1
                }
            })
            setGlobalDataSync('editData',()=>{
                return JSON.parse(editDataHistory.data[index].data)
            })
        }}>{item.text}</List.Item>}
    />
}
