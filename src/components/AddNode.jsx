import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function AddNode({path}){
    const navigate = useNavigate();

    function create(){
        navigate(path);
    }

    return(
        <ContainerAddNote onClick={create}>
            +
        </ContainerAddNote>
        
    )
}

const ContainerAddNote = styled.div`
    position: fixed;
    z-index: 3;
    right: 30px;
    bottom: 30px;
    width: 90px;
    height: 90px;
    background-color: #5f4133;
    border-radius: 50%;
    color: #ffffff;
    padding: 20px;
    cursor: pointer;
    font-size: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    transition: 200ms;
    &:hover {
        background-color: #703e27;
        color: #ffffff;
    }
    @media(max-width: 800px){
        width: 70px;
        height: 70px;
        right: 10px;
        font-size: 60px;
    }
`