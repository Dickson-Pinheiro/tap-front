import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
export default function AddNode(){
    const navigate = useNavigate();

    function createNote(){
        navigate("/notes/create");
    }

    return(
        <ContainerAddNote onClick={createNote}>
            +
        </ContainerAddNote>
        
    )
}

const Container = styled.div`
    width: 250px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
`

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