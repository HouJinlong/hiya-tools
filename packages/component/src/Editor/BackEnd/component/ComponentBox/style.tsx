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
  justify-content: space-around;
  flex-direction: column;
  font-size: 12px;
  line-height: 14px;
`
export const ComponentBoxImg = styled.img`
  max-height: 40px;
  max-width: 100%;
  display: block;
`