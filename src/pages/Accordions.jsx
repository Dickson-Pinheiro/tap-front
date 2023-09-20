import { useEffect, useState } from "react";
import { listsService } from "../services/listsService";
import styled, { css } from "styled-components";
import EditCheckItem from "../components/EditCheckItem";
import Accordion from "../components/Accordion";
import EditAddCheckItem from "../components/EditAddCheckItem";
import { useNavigate } from "react-router-dom";

export default function Accordions(){
    const [list, setList] = useState();
    const [title, setTitle] = useState();
    const { getOneList } = listsService();
    const [update, setUpdate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getList(){
            try {
                const result = await getOneList("65014f2e9c4ea462d46b8fb5");
                setList(result.data.list);
                setTitle(result.data.list.title);
            } catch (error) {
                navigate("/")
            }
        }
        getList();
    }, [update])

    return(
        <ContainerAccordions>
            <AccordionsBox>
                <Accordion title={title ? title : ""}>
                <ContainerCheckItems>
                    {list?.items.map(item => {
                        console.log(item)
                    return <EditCheckItem content={item.content} checked={item.done} items={list?.items} id={"65014f2e9c4ea462d46b8fb5"} key={item.content} title={list?.title} update={update} setUpdate={setUpdate}/>})}
                    <EditAddCheckItem items={list?.items} title={list?.title} id={"65014f2e9c4ea462d46b8fb5"} update={update} setUpdate={setUpdate}/>
                </ContainerCheckItems>
                </Accordion>
            </AccordionsBox>
        </ContainerAccordions>
    );
}

const ContainerAccordions = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`

const AccordionsBox = styled.div`
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: fit-content;
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