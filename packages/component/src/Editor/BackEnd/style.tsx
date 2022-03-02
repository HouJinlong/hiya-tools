
import styled from "styled-components"

export const Box = styled.div`
  display: flex;
  height: 100%;
`
export const EditBox = styled.div`
  flex: 1; 
  width: 100%;
  overflow: auto;
`
export const EditBoxIframe = styled.iframe`
  width: 375px;
  height: 667px;
  display: block;
  flex-shrink: 0;
  margin: 20px;
  border: 0;
`

export const scrollBox= styled.div`
  height:100%;
  overflow: auto;
  &>.ant-card{
    height:100%;
    display: flex;
    flex-direction: column;
    &>.ant-card-body{
      flex: 1;
      overflow: auto;
    }
  }
`