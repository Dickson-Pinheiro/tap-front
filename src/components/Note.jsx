import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { BsTrash3Fill } from 'react-icons/bs';
import { noteService } from "../services/notesService";

export default function Note({content, id, setUpdateNotes, updateNotes}){
    const { deleteNote } = noteService();
    const navigate = useNavigate();

    function handleNote(){
        navigate(`/edit/${id}`); 
    }

    function removeNote(){
        deleteNote(id);
        setUpdateNotes(!updateNotes); 
    }

    return (
        <Container>
            <span onClick={removeNote}>
                <BsTrash3Fill />
            </span>
        <ContainerNote onClick={handleNote}>
            <p>{content.substring(0, 120) + "..."}</p>
        </ContainerNote>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    span {
        position: absolute;
        right: 8px;
        top: 8px;
        color: #ffffff;
        visibility: hidden;
        z-index: 3;
        cursor: pointer;
    }
    &:hover {
        span {
            visibility: visible;
        }
    }
    @media(max-width: 800px){
        span {
            visibility: visible;
        }
    }
`

const ContainerNote = styled.div`
    position: relative;
    z-index: 2;
    width: 250px;
    height: 220px;
    background-color: #5f4133;
    color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    letter-spacing: 5%;
    line-height: 24px;
    font-size: 18px;
    font-family: 'Lora', serif;
    font-weight: 400;
    transition: 200ms;
    &:hover {
        background-color: #703e27;
        span {
            visibility: visible;
        }
    }
    @media(max-width: 540px){
        width: 90vw;
    }
`