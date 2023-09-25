import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { BsThreeDots } from "react-icons/bs"
import styled from "styled-components"
import SortableCard from "./SortableCard"
import { useState } from "react"

export default function SortableColumn({ column }) {
    const [cards, setCards] = useState(column.cards)
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: column.id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }


    const onDragEnd = event => {
        console.log(event);
        const {active, over} = event;
        if(active.id === over.id){
            return
        }

        setCards(cards => {
            const oldIndex = cards.findIndex(column => column.id === active.id)
            const newIndex = cards.findIndex(column => column.id === over.id)
            return arrayMove(cards, oldIndex, newIndex)
        })
    }

    return (
        <Column ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ColumnHeader>
                <h3>{column.title}</h3>
                <BsThreeDots />
            </ColumnHeader>
            <ColumnContent>
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                        {cards.map(card => (
                            <SortableCard card={card} key={card.id}/>
                        ))}
                    </SortableContext>
                </DndContext>
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
    height: fit-content;
    overflow-x: none;
    max-height: calc(100% - 20px);
    background-color: #ebecf0;
    border-radius: 12px;
    padding: 5px;
    padding-left: 8px;
    box-shadow: 0 1px 1px #091e4240,0 0 1px #091e424f;
`

const ColumnHeader = styled.div`
    display: flex;
    padding-top: 12px;
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 12px;
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
    height: fit-content;
    padding-bottom: 8px;
    padding-right: 4px;
    max-height: calc(100vh - 270px);
    overflow: hidden;
    overflow-x: none;
    overflow-y: auto;
    gap: 8px;
    &::-webkit-scrollbar {
        width: 8px;
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
    padding: 10px;
    margin-top: 4px;
    cursor: pointer;
    p {
        color: #172b4d;
    }
`