import styled from "styled-components"

export const ComponentBox =styled.div`
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
`
export const ComponentBoxItem =styled.div`
  width: 80px;
  min-height: 84px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  margin-bottom:10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const ComponentBoxImg = styled.img`
  height: 40px;
  display: block;
`