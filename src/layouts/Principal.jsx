import { styled } from "styled-components"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

export default function Principal(){
    return(
        <ContainerPrincipal>
            <Header></Header>
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