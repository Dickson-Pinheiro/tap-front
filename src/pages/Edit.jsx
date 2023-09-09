import { useEffect, useState } from "react"
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { styled } from "styled-components"
import { noteService } from "../services/notesService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Edit(){
    const [content, setContent] = useState();
    const [change, setChange] = useState(false);
    const { updateNote, getOneNote } = noteService()
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        async function getOne(){
            try {
                const result = await getOneNote(id);
                setContent(result.data.note.Content);   
            } catch (error) {
                toast("Sua sessão expirou.")   
            }
        }
        getOne();
    }, [])

    function changeNotes(e){
        setContent(e.target.value);
        if(e.target.value.length == 0){
            setChange(false)
            return
        }
        setChange(true)
    }

    async function handleNotes(){
        if(!change){
            return
        }
        await updateNote(content, id);
        setChange(false);
    }

    async function backContentNote(){
        const result = await getOneNote(id);
        setContent(result.data.note.Content);
        setChange(false);
    }

    return(
        <ContainerCreate>
            <BackContainer>
                <BackButton onClick={() => navigate("/notes/home")}>
                    <BsFillArrowLeftCircleFill />
                </BackButton>
            </BackContainer>
            <ContentCreate>
                <ContainerButtons>
                <SaveButton change={change} onClick={backContentNote}>Desfazer</SaveButton>
                <SaveButton change={change} onClick={handleNotes}>Salvar</SaveButton>
                </ContainerButtons>
                <TextContent onChange={changeNotes} value={content}>
                </TextContent>
            </ContentCreate>
        </ContainerCreate>
    )
}

const ContainerCreate = styled.div`
    width: 100%;
    padding: 15px;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
`

const BackContainer = styled.div`
    max-width: 920px;
    width: 100%;
`
const BackButton = styled.div`
    width: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #5f4133;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    cursor: pointer;
`

const ContentCreate = styled.div`
    position: relative;
    max-width: 920px;
    width: 100%;
    border-radius: 8px;
    height: 70vh;
    background-color: #5f4133;
    padding: 12px;
`

const SaveButton = styled.button`
    background: none;
    border: none;
    color: white;
    padding: 8px;
    font-weight: bold;
    font-size: 18px;
    opacity: ${props => props.change ? 1 : 0.5};
    font-family: 'Rubik', sans-serif;
    transition: 200ms;
    cursor: pointer;
`

const ContainerButtons = styled.div`
    position: absolute;
    right: 10px;
`

const TextContent = styled.textarea`
    width: 100%;
    max-height: calc(100% - 38px);
    height: 100%;
    border: none;
    resize: none;
    outline: #060606;
    padding: 8px;
    padding-top: 40px;
    background: transparent;
    line-height: 24px;
    font-size: 18px;
    font-family: 'Lora', serif;
    font-weight: 600;
    color: white;
    &::-webkit-scrollbar {
        width: 8px;
    }
`