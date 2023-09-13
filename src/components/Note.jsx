import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { BsTrash3Fill } from 'react-icons/bs';
import { noteService } from "../services/notesService";
import { Oval } from "react-loader-spinner";
import { useState } from "react";

export default function Note({content, id, setUpdateNotes, updateNotes}){
    const { deleteNote } = noteService();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    function handleNote(){
        if(load) return;
        navigate(`/dash/notes/edit/${id}`); 
    }

    async function removeNote(){
        setLoad(true);
        try {
            await deleteNote(id);
            setUpdateNotes(!updateNotes);
        } catch (error) {
            setLoad(false);
            console.log("Não excluiu")
        } 
    }

    return (
        <Container>
            <span >
                {load ? <Oval width={15} height={15} color="#ffffff"S secondaryColor="#703e27"/> :<BsTrash3Fill onClick={removeNote}/>}
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