import styled from "styled-components";
import { listsService } from "../services/listsService";
import CheckBox from "../components/CheckBox";
import AddNode from "../components/AddNode";
import { useEffect, useState } from "react";

export default function Checklists(){
    const [lists, setLists] = useState();
    const [updateLists, setUpdateLists] = useState(false);
    const { getLists } = listsService();

    useEffect(() => {
        async function handleLists(){
            const result = await getLists();
            console.log(result);
            setLists(result.data.lists);
        }
        handleLists()
    }, [updateLists])



    return(
        <ContainerChecklist>
            <ContainerCheckBox>
                {lists?.map((list) => {
                return <CheckBox title={list.list.title} key={list._id} id={list._id} updateLists={updateLists} setUpdateLists={setUpdateLists}/>})}
            </ContainerCheckBox>
            <AddNode path="/dash/checklists/create"/>
        </ContainerChecklist>
    )
}

const ContainerChecklist = styled.div`
    width: 100%;
    flex: 1;
    padding-top: 30px;
    display: flex;
    justify-content: center;
`

const ContainerCheckBox = styled.div`
    max-width: 1100px;
    height: fit-content;
    cursor: pointer;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`