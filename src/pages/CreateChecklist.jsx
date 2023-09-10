import { useState } from "react";
import { listsService } from "../services/listsService";
import styled from "styled-components";
import CheckItem from "../components/CheckItem";
import AddCheckItem from "../components/AddCheckItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateChecklist(){
    const [title, setTitle] = useState("Título da minha lista")
    const navigate = useNavigate()
    const { createList } = listsService()
    const [items, setItems] = useState([])

    async function saveChecklist(){
        if(items.length === 0){
            toast("insira ao menos um item na lista.")
            return;
        }
        try {
            await createList({
                title,
                items
            })
            navigate("/dash/checklists")
        } catch (error) {
            toast("Não foi possível salvar.")
        }
    }
    const [editable, setEditable] = useState(true);

    function editTitle(e){
        if(e.detail === 2){
            setEditable(true)
        }
    }

    function submitInputTitle(e){
        e.preventDefault()
        setEditable(false)
        if(title.length === 0){
            setTitle("Título da minha lista")
        }
    }

    function changeTitle(e){
        const value = e.target.value;
        if(value.length > 40){
            return;
        }
        setTitle(value);
    }

    if(title.length === 0 && !editable){
        setTitle("Título da minha lista")
    }

    return(
        <ContainerCreate>
            <Container>
            {editable ? <form onSubmit={submitInputTitle}><input autoFocus type="text" value={title} onChange={changeTitle} onBlur={() => setEditable(false)}/></form> : <h1 onClick={editTitle}>{title}</h1>}
            <ContainerCheckItems>
                {items?.map(item => {
                return <CheckItem content={item.content} checked={item.done} key={item.content} setItems={setItems} items={items}/>
                })}
                <AddCheckItem items={items} setItems={setItems} saveChecklist={saveChecklist}/>
            </ContainerCheckItems>
            </Container>
        </ContainerCreate>
    )
}

const ContainerCreate = styled.div`
    width: 100%;
    flex: 1;
    padding: 20px;
`

const ContainerCheckItems = styled.div`
    width: 100%;
    margin-top: 30px;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    form {
        width: 100%;
        max-width: 800px;
    }
    & > form input {
        border: none;
        font-size: 24px;
        font-family: 'Rubik', sans-serif;
        outline: none;
        padding: 0;
        margin: 0;
        height: 26px;
        box-sizing: border-box;
        max-width: 800px;
        width: 100%;
    }
    h1 {
        font-size: 24px;
        font-family: 'Rubik', sans-serif;
        line-height: 26px;
        max-width: 800px;
        width: 100%;
    }
`