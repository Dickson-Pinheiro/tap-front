import { useState } from "react"
import { listsService } from "../services/listsService"
import { toast } from "react-toastify"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function EditCheckItem({content, checked, items, title, id, update, setUpdate}){
    const [contentItem, setContentItem] = useState(content)
    const [check, setCheck] = useState(checked)
    const { updateList } = listsService()
    const [editable, setEditable] = useState(false)
    const navigate = useNavigate()

    function editableItem(e){
            setEditable(true)
    }

    async function submitItem(e){
        e.preventDefault()
        let addedItem = false;
        setEditable(false);
        if(contentItem === content){
            return;
        }
        items.forEach(item => {
            if(item.content === contentItem){
                addedItem = true;
            }
        })
        if(addedItem){
            setContentItem(content)
            toast("Este item já foi adicionado.")
            return
        }
        const newItems = items.map(item => {
            if(item.content === content){
                return {
                    content: contentItem,
                    done: item.done
                }
            }
            return item;
        })
        try {
            await updateList({items: newItems, title}, id);
            setUpdate(!update);
        } catch (error) {
            toast("Sua sessão expirou.");
            navigate("/");
            
        }
        
    }

    async function updateDone(){
        const newItems = items.map(item => {
            if(item.content === content){
                const newItem = {
                    content: item.content,
                    done: !item.done
                }
                return newItem
            }
            return item;
        })
        try {
            await updateList({items: newItems, title}, id);
            setUpdate(!update);
        } catch (error) {
            toast("Sua sessão expirou.");
            navigate("/");   
        }
    }

    return(
        <CheckItemContainer done={check}>
            <input type="checkbox" checked={check} onClick={updateDone} onChange={() => setCheck(!check)}/>
            {editable ? <form onSubmit={submitItem}><input type="text" value={contentItem} autoFocus onChange={(e) => setContentItem(e.target.value)} onBlur={submitItem}/></form> : <p onClick={editableItem}>{contentItem}</p>}
        </CheckItemContainer>
    )
}

const CheckItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    width: 100%;
    max-width: 800px;
    p {
        width: 100%;
        max-width: 800px;
        text-decoration: ${props => props.done ? "line-through" : "none"};
    }
    input[type="checkbox"]{
        width: 20px;
        height: 20px;
    }
`