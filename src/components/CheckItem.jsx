import { useState } from "react"
import { toast } from "react-toastify"
import styled from "styled-components"

export default function CheckItem({content, checked, setItems, items}){
    const [contentItem, setContentItem] = useState(content)
    const [done, setDone] = useState(checked)
    const [editable, setEditable] = useState(false)

    function editableItem(e){
        setEditable(true)
    }

    function submitItem(e){
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
        setItems(newItems);
    }

    function updateDone(){
        const newItems = items.map(item => {
            if(item.content === content){
                return {
                    content: item.content,
                    done: !item.done
                }
            }
            return item;
        })

        setItems([...newItems])
        setDone(!done);
    }

    return(
        <CheckItemContainer done={done}>
            <input type="checkbox" checked={done} onClick={updateDone}/>
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