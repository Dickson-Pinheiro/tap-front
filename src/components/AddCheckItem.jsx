import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function AddCheckItem({items, setItems, saveChecklist}){
    const [addContent, setAddContent] = useState(false);
    const [newContent, setNewContent] = useState("");

    function add(){
        setAddContent(true)
    }

    function cancel(){
        setNewContent("");
        setAddContent(false)
    }

    function save(e){
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
        const newItem = {content: newContent, done: false}
        const newItems = [...items, newItem]
        setItems(newItems);
        setNewContent("");
        setAddContent(false);
    }

    return(
        <ContainerAddCheckItem>
            {!addContent && <ContainerButtons><button onClick={add}>Adicionar</button><button onClick={saveChecklist}>Salvar checklist</button></ContainerButtons>}
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