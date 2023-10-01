import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { BsThreeDots } from "react-icons/bs"
import styled from "styled-components"
import SortableCard from "./SortableCard"
import { useMemo, useState } from "react"

export default function SortableColumn({ column, cards }) {

    const cardsId = useMemo(() => cards.map(c => c.id), [column])

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.id, data: {
        type: "Column",
        column: JSON.parse(JSON.stringify(column))
    } })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    
    if(isDragging){
        return <ColumnOverlay ref={setNodeRef} style={style}>
            <ColumnHeader>
            <h3>{column.title}</h3>
            </ColumnHeader>
            <ColumnContent>
                {cards.map(card => {
                    return <SortableCard card={card} key={card.id}/>
                })}
            </ColumnContent>
            <AddCard>
                <p>+ adicionar um cartão</p>
            </AddCard>
        </ColumnOverlay>
    }

    return (
        <Column ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ColumnHeader>
                <h3>{column.title}</h3>
                <BsThreeDots />
            </ColumnHeader>
            <ColumnContent>
                    <SortableContext items={cardsId}>
                        {cards.map(card => {
                           return <SortableCard card={card} key={card.id}/>
                        })}
                    </SortableContext>
            </ColumnContent>
            <AddCard>
                <p>+ adicionar um cartão</p>
            </AddCard>
        </Column>
    )
}

const Column = styled.div`
    box-sizing: border-box;
    min-width: 272px;
    max-width: 272px;
    height: 600px;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    border-radius: 12px;
`

const ColumnOverlay = styled.div`
    min-width: 272px;
    max-width: 272px;
    height: 600px;
    border-radius: 12px;
    opacity: 0.7;
`

const ColumnHeader = styled.div`
    display: flex;
    padding-top: 12px;
    padding-left: 18px;
    padding-right: 18px;
    padding-bottom: 10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: #ebecf0;
    justify-content: space-between;
    h3 {
        font-family: 'Lora', serif;
        font-weight: 500;
        font-size: 16px;
        color: #172b4d;
    }

`

const ColumnContent = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
    padding: 8px;
    background-color: #ebecf0;
    height: fit-content;
    max-height: calc(100vh - 270px);
    overflow-x: none;
    overflow-x: hidden;
    overflow-y: auto;
    gap: 8px;
    &::-webkit-scrollbar {
        width: 8px;
        padding-right: 2px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(180, 180, 182, 0.8); 
        border-radius: 20px;
}
`

const AddCard = styled.div`
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 10px;
    background-color: #ebecf0;
    cursor: pointer;
    p {
        color: #172b4d;
    }
`

/*box-shadow: 0 1px 1px #091e4240,0 0 1px #091e424f;*/