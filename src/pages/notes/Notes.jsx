import styled from "styled-components";
import { noteService } from "../../services/notesService";
import { useEffect, useState } from "react";
import Note from "../../components/Note";
import AddNode from "../../components/AddNode";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";
export default function Notes(){
    const [notes, setNotes] = useState()
    const [updateNotes, setUpdateNotes] = useState(false);
    const { getNotes } = noteService();
    useEffect(() => {
        async function notesResult(){
            try {
                const result = await getNotes();
                setNotes(result.data.notes);
            } catch (error) {
                toast("Sua sessão expirou.")
            }
        }
        notesResult();
    }, [updateNotes])

    if(notes == undefined){
        return(
            <ContainerSpin>
                <InfinitySpin color="#5f4133"/>
            </ContainerSpin>
        )
    }

    return(
        <ContainerHome>
            {notes?.length ? "" : <NoContent><h1>CRIE<br/>SUAS<br/>NOTAS.</h1></NoContent>}
            <ContainerNotes>
                {notes?.map(note => <Note key={note?._id} content={note.note?.Content} id={note?._id} setUpdateNotes={setUpdateNotes} updateNotes={updateNotes}/>).reverse()}
            </ContainerNotes>
            <AddNode path="/dash/notes/create"/>
        </ContainerHome>
    )
}

const ContainerSpin = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContainerHome = styled.div`
    width: 100%;
    display: flex;
    padding: 15px;
    justify-content: center;
    flex: 1;
`
const ContainerNotes = styled.div`
    display: flex;
    max-width: 1100px;
    height: fit-content;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    @media(max-width: 800px){
        justify-content: center;
    }
`

const NoContent = styled.div`
    h1 {
        font-family: 'Lora', serif;
        font-size: 44px;
        font-weight: bolder;
        color: #5f4133;
        margin-top: 30px;
    }
`