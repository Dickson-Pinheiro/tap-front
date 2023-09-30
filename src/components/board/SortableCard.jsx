import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import styled from "styled-components"

export default function SortableCard({ card }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id, data: {
        type: "Card",
        card: {...card},
    } })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    if(isDragging){
        return <CardContainerOverlay ref={setNodeRef} style={style}>
        </CardContainerOverlay>
    }

    return (
        <CardContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <p>{card.title}</p>
        </CardContainer>
    )
}

const CardContainer = styled.div`
    width: 100%;
    padding: 15px;
    height: 120px;
    min-height: 80px;
    max-height: 80px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 1px 1px #091e4240,0 0 1px #091e424f;
    cursor: pointer;
    p {
        font-family: 'Lora', serif;
        font-weight: 400;
        font-size: 14px;
        color: #172b4d;
    }
`

const CardContainerOverlay = styled.div`
    width: 100%;
    padding: 15px;
    height: 120px;
    min-height: 80px;
    max-height: 80px;
    background-color: #000000;
    border-radius: 4px;
    opacity: 0.3;
    box-shadow: 1px 1px #091e4240,0 0 1px #091e424f;
`