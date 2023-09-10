import { useState } from "react"
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { styled } from "styled-components"
import { noteService } from "../../services/notesService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Create(){
    const [content, setContent] = useState();
    const [change, setChange] = useState(false);
    const { createNotes } = noteService()
    const navigate = useNavigate()

    function changeNotes(e){
        setContent(e.target.value);
        if(e.target.value.length == 0){
            setChange(false)
            return
        }
        setChange(true)
    }

    async function handleNotes(){
        if(!content){
            return
        }
        try {
            await createNotes(content)
            navigate("/dash/notes")   
        } catch (error) {
            toast("Sua sessão expirou.")
        }
    }

    return(
        <ContainerCreate>
            <BackContainer>
                <BackButton onClick={() => navigate("/dash/notes")}>
                    <BsFillArrowLeftCircleFill />
                </BackButton>
            </BackContainer>
            <ContentCreate>
                <ContainerButtons>
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
    border-radius: 8px;
    max-width: 920px;
    width: 100%;
    height: 70vh;
    background-color: #5f4133;
    padding: 12px;
`

const Controls = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`

const SaveButton = styled.button`
    border: none;
    color: white;
    padding: 8px;
    background: none;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    font-size: 18px;
    opacity: ${props => props.change ? 1 : 0.5};
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
    line-height: 24px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    &::-webkit-scrollbar {
        width: 8px;
    }
`