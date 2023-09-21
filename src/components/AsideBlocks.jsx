import styled from "styled-components"
import BlockItem from "./BlockITem"
import { blocksService } from "../services/blocksService";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AsideBlocks({blocksITems, updateBlocks, setUpdateBlocks, setSelectedBlock}){
    const [title, setTitle] = useState("");
    const { createBlock } = blocksService();
    const [open, setOpen] = useState(false);
    console.log(blocksITems)
    
    async function handleBlock(e){
        e.preventDefault();
        if(!title){
            toast("Informe um título")
            return
        }

        await createBlock({
            title,
            block: []
        })
        setUpdateBlocks(!updateBlocks)
        setOpen(false)
    }

    return(
        <Container>
            {!(blocksITems?.length > 0) ? <div>Crie uma página</div> : ""}

            {
            blocksITems?.map(item => {
                console.log("item ->",  item);
            return <BlockItem block={item}  key={item._id} setSelectedBlock={setSelectedBlock}/>})
            }

            {
                open &&
            <FormCreatePage onSubmit={handleBlock}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                <ContainerButton>
                <ConfirmButton type="submit">adicionar</ConfirmButton>
                <CancelButton type="button" onClick={() => setOpen(false)} >Cancelar</CancelButton>
                </ContainerButton>
            </FormCreatePage>
            }

            {!open && <AddBlockButton onClick={() => setOpen(true)}>+</AddBlockButton>}
        </Container>
    )
}

const Container = styled.aside`
    width: 300px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: #a1a1a1;
`

const AddBlockButton = styled.div`
    width: 100%;
    height: 30px;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    cursor: pointer;
`

const FormCreatePage = styled.form`
    width: 100%;
    input {
        width: 100%;
        height: 30px;
    }
`

const ConfirmButton = styled.button`
    width: 80px;
    height: 30px;
    background-color: #212121;
    color: white;
    font-size: 12px;
    font-family: 'Rubik', sans-serif;
    border-radius: 4px;
    margin-top: 10px;
`

const CancelButton = styled.button`
        width: 80px;
        height: 30px;
        background-color: #6a6868;
        color: white;
        font-size: 12px;
        font-family: 'Rubik', sans-serif;
        border-radius: 4px;
        margin-top: 10px;
`

const ContainerButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`