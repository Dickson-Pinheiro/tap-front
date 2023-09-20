import styled from "styled-components";
import { listsService } from "../services/listsService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditCheckItem from "../components/EditCheckItem";
import EditAddCheckItem from "../components/EditAddCheckItem";

export default function EditChecklist(){
    const { getOneList, updateList } = listsService();
    const [list, setList] = useState();
    const [title, setTitle] = useState("");
    const [update, setUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()
    const [editable, setEditable] = useState(false);
    
    useEffect(() => {
        async function getList(){
            try {
                const result = await getOneList(id);
                setList(result.data.list);
                setTitle(result.data.list.title);
            } catch (error) {
                navigate("/")
            }
        }
        getList();
    }, [update])

    function edit(e){
        setEditable(true);
    }

    async function submitTitle(e){
        e.preventDefault();
        setEditable(false);
        if(!title){
            return
        }
        if(list?.title === title){
            return
        }
        try {
            await updateList({...list, title: title}, id);
            setUpdate(!update);
            setEditable(false);  
        } catch (error) {
            toast("Sua sessão expirou.");
            navigate("/");
        }
    }

    return(
        <EditChecklistContainer>
            <Container>
                {editable ? <form onSubmit={submitTitle}><input type="text" value={title} autoFocus onChange={e => setTitle(e.target.value)} onBlur={submitTitle} /></form> : <h1 onClick={edit}>{title}</h1>}
                <ContainerCheckItems>
                    {list?.items.map(item => {
                        console.log(item)
                    return <EditCheckItem content={item.content} checked={item.done} items={list?.items} id={id} key={item.content} title={list?.title} update={update} setUpdate={setUpdate}/>})}
                    <EditAddCheckItem items={list?.items} title={list?.title} id={id} update={update} setUpdate={setUpdate}/>
                </ContainerCheckItems>
            </Container>
        </EditChecklistContainer>
    )
}

const EditChecklistContainer = styled.div`
     width: 100%;
    flex: 1;
    padding: 20px;
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