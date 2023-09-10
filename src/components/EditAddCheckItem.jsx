import { useState } from "react";
import { listsService } from "../services/listsService";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function EditAddCheckItem({items, title, id, update, setUpdate}){
    const { updateList } = listsService(); 
    const [addContent, setAddContent] = useState(false);
    const [newContent, setNewContent] = useState("");
    const navigate = useNavigate();

    function add(){
        setAddContent(true)
    }

    function cancel(){
        setNewContent("");
        setAddContent(false)
    }

    async function save(e){
        e.preventDefault()
        let contentExist = false;
        if(!newContent){
            return;
        }
        items.forEach(item => {
            if(item?.content === newContent){
                contentExist = true;
            }
        })
        if(contentExist){
            toast("Esse item já foi adicionado");
            setNewContent("");
            return;
        }
        const newItem = {content: newContent, done: false};
        const newItems = [...items, newItem];
        try {
            await updateList({items: newItems, title: title}, id);
            setUpdate(!update);
            setNewContent("");
            setAddContent(false);
        } catch (error) {
            toast("Sua sessão expirou.");
            navigate("/");
        }
    }

    return(
        <ContainerAddCheckItem>
            {!addContent && <ContainerButtons><button onClick={add}>Adicionar</button></ContainerButtons>}
            {addContent && <ContainerSaveItem>
                <form onSubmit={save}><input value={newContent} onChange={(e) => setNewContent(e.target.value)}/></form>
                <ContainerButtons>
                    <button onClick={save}>save</button>
                    <button onClick={cancel}>cancel</button>
                </ContainerButtons>
            </ContainerSaveItem>
            }
        </ContainerAddCheckItem>
    )
}

const ContainerAddCheckItem = styled.div`
    width: 100%;
    max-width: 800px;
`

const ContainerSaveItem = styled.div`
    
`
const ContainerButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`