import styled from "styled-components"
import { Divider } from "antd"

export const Container = styled.div`
    background-color: #efefef;
    font-weight: 600;
    margin: -25px -25px 0 -25px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
`

export const Title = styled.span`
    text-transform: uppercase;
    padding: 25px 25px 5px 25px;
`

export const Extra = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 20px;
`

export const CustomDivider = styled(Divider)`
    border-left: 1px solid #c3c3c3;
    height: 60%;
`