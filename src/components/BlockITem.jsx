import styled from "styled-components"

export default function BlockItem({block, setSelectedBlock, setUpdateBlocks, updateBlocks}){
    
    function handleBlock(){
        setSelectedBlock(block);
        setUpdateBlocks(!updateBlocks)
    }

    return(
        <Container onClick={handleBlock}>
            <p>{block.block.title}</p>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    background-color: #232323;
    color: #ffffff;
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
`