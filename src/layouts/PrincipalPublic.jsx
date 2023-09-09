import { styled } from "styled-components"

import { Outlet } from "react-router-dom"
import HeaderPublic from "../components/HeaderPublic"

export default function PrincipalPublic(){
    return(
        <ContainerPrincipal>
            <HeaderPublic />
            <Outlet></Outlet>
        </ContainerPrincipal>
    )
}

const ContainerPrincipal = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
`