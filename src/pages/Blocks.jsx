import styled from "styled-components"
import Block from "../components/Block"
import AsideBlocks from "../components/AsideBlocks"
import { blocksService } from "../services/blocksService"
import { useEffect, useState } from "react"

export default function Blocks(){
    const { getBlocks } = blocksService();
    const [blocksItems, setBlocksItems] = useState();
    const [selectedBlock, setSelectedBlock] = useState();
    const [updateBlocks, setUpdateBlocks] = useState(false);

    useEffect(() => {
        async function getB(){
            const result = await getBlocks();
            setBlocksItems(result.data.blocks);
        }
        getB()
    }, [updateBlocks])

    if(blocksItems === undefined){
        return(
            <div>carregando...</div>
        )
    }


    return(
        <BlocksContainer>
            <AsideBlocks blocksITems={blocksItems} updateBlocks={updateBlocks} setUpdateBlocks={setUpdateBlocks} setSelectedBlock={setSelectedBlock}/>
            <BlockWriter>
                {selectedBlock && <Block selectedBlock={selectedBlock} updateBlocks={updateBlocks} setUpdateBlocks={setUpdateBlocks}></Block> }
                {!selectedBlock && <div>Selecione uma página.</div>}
            </BlockWriter>
        </BlocksContainer>
    )
}

const BlocksContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    box-sizing: border-box;
`

const BlockWriter = styled.div`
    width: 100%;
`