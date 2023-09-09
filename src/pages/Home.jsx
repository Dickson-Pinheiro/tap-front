import styled from "styled-components";
import { noteService } from "../services/notesService";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import AddNode from "../components/AddNode";
import { InfinitySpin } from "react-loader-spinner";
export default function Home(){
    const [notes, setNotes] = useState()
    const [updateNotes, setUpdateNotes] = useState(false);
    const { getNotes } = noteService();
    useEffect(() => {
        async function notesResult(){
            const result = await getNotes();
            console.log(result.data.notes)
            setNotes(result.data.notes);
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
            <AddNode/>
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

const CreateNote = styled.div`
    position: fixed;
    width: 90px;
    height: 90px;
    cursor: pointer;
    right: 20px;
    bottom: 30px;
    border-radius: 50%;
    background-color: #48ff00;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
`