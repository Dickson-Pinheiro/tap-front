import styled from "styled-components"
import Header from "../components/Header"
import { useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import SortableColumn from "../components/board/SortableColumn";
import { createPortal } from "react-dom";
import SortableCard from "../components/board/SortableCard";


const initialCards = [
    {
        title: "Criar header das rotas não autenticadas",
        id: 5,
        columnId: 1
    },
    {
        title: "Criar testes automatizados para validar entradas doca",
        id: 6,
        columnId: 1
    },
]

const initialColumns = [
        {
            id: 1,
            title: "To do",
            cards: [
                {
                    title: "Criar header das rotas não autenticadas",
                    id: 5,
                    columnId: 1
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 6,
                    columnId: 1
                },
            ]
        },
        {
            id: 2,
            title: "doing",
            cards: [
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 7,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 8,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 9,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 10,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 11,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 12,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 13,
                    columnId: 2
                },
                {
                    title: "Criar testes automatizados para validar entradas doca",
                    id: 14,
                    columnId: 2
                },
            ]
        },
        {
            id: 3,
            title: "done",
            cards: []
        },
        {
            id: 4,
            title: "arquivado",
            cards: []
        }
    ]


export default function Board() {
    const [columns, setColumns] = useState(initialColumns);

    const columnsId = useMemo(() => columns.map(col => col.id), [columns])
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const sensor = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3,
        }
    }))

    const onDragEnd = event => {
        setActiveCard(null)
        setActiveColumn(null)
        console.log(columns)
        const {active, over} = event;
        if(active?.id === over?.id){
            return
        }

        if(event.active.data.current.type === "Column"){
            setColumns(columns => {
                const oldIndex = columns.findIndex(column => column.id === active.id)
                const newIndex = columns.findIndex(column => column.id === over.id)
                const columnsCopy = JSON.parse(JSON.stringify(columns));
    
                const newColumns = arrayMove(columnsCopy, oldIndex, newIndex)
                console.log(newColumns);
                return newColumns
            })
        }
    }

    function onDragStart(event) {
       
        if(event.active.data.current?.type === "Column"){
            setActiveColumn(event.active.data.current.column)
        }
        if(event.active.data.current.type === "Card"){
            setActiveCard(event.active.data.current.card)
        }
    }

    function onDragOver(event){
        const {active, over} = event;
        console.log('ativou')
        if(!over) return;

        const activeId = active.id
        const overId = over.id

        if(activeId === overId){
            return
        }

        const isActiveACard = active.data.current.type === "Card"
        const isOverACard = over.data.current.type === "Card"

        if(isActiveACard && isOverACard){
            const activeCard = active.data.current.card
            const overCard = over.data.current.card
            const activeCardColumnIndex = columns.findIndex(c => c.id === activeCard.columnId)
            const overCardColumnIndex = columns.findIndex(c => c.id === overCard.columnId)

            const activeCardIndex = columns[activeCardColumnIndex].cards.findIndex(c => c.id === activeCard.id)
            const overCardIndex =  columns[overCardColumnIndex].cards.findIndex(c => c.id === overCard.id)
            console.log(activeCardColumnIndex)
            if(activeCardColumnIndex !== overCardColumnIndex){
                const newColumns = JSON.parse(JSON.stringify(columns));
                const [removedCard] = newColumns[activeCardColumnIndex].cards.splice(activeCardIndex, 1)
                console.log(overCardIndex)
                newColumns[overCardColumnIndex].cards.splice(overCardIndex, 0, {...removedCard, columnId: overCard.columnId});
                setColumns([...JSON.parse(JSON.stringify(newColumns))])
            }
            if(activeCardColumnIndex === overCardColumnIndex){
                const newColumns = JSON.parse(JSON.stringify(columns));
                newColumns[activeCardColumnIndex].cards = arrayMove(
                    newColumns[activeCardColumnIndex].cards,
                    activeCardIndex,
                    overCardIndex
                )
    
                setColumns([...newColumns])
                return
            }
        }
        if(active.data.current.type === "Card" && over.data.current.type === "Column"){
            if(active.data.current.card.columnId === over.data.current.column.id){
                return
            }
            const activeCard = active.data.current.card
            const overColumn = over.data.current.column

            const overColumnIndex = columns.findIndex(c => c.id === overColumn.id)
            const activeCardOriginColumnIndex = columns.findIndex(c => c.id === activeCard.columnId)
            const activeCardIndex = columns[activeCardOriginColumnIndex].cards.findIndex(c => c.id === activeCard.id)

            const newColumns = JSON.parse(JSON.stringify(columns));
            const [removedCard] = newColumns[activeCardOriginColumnIndex].cards.splice(activeCardIndex, 1);
            newColumns[overColumnIndex].cards.push({...removedCard, columnId: overColumn.id})
            setColumns(newColumns)
        }
    }


    return (
        <BoardContainer>
            <Header backgroundColor="hsl(250,47.9%,40.7%)" color="#ffffff" />
            <Container>
                <WorkspaceData>
                    <WorkspaceDataHeader>
                        <img src="https://github.com/Dickson-Pinheiro.png" />
                        <h2>Bandeira Comunicação</h2>
                    </WorkspaceDataHeader>
                </WorkspaceData>
                <ColumsData>
                    <HeaderColumns>
                        <Left>
                            <h1>Glow - Campanha de Lançamento</h1>
                        </Left>
                    </HeaderColumns>
                    <div>
                    <DndContext sensors={sensor} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
                    <ColumnsContainer>
                            <SortableContext items={columnsId}>
                                {columns.map(column => (
                                    <SortableColumn column={column} cards={column.cards} key={column.id} />
                                ))}
                            </SortableContext>
                    </ColumnsContainer>
                    {createPortal(<DragOverlay>
                        {activeColumn && (<SortableColumn column={activeColumn} cards={activeColumn.cards}/>)}
                        {activeCard && <SortableCard card={activeCard} />}
                    </DragOverlay>, document.body)
                    }
                    </DndContext>
                    </div>
                </ColumsData>
                
            </Container>
        </BoardContainer>
    )
}



const BoardContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 48px;
`

const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 49px);
    height: 100%;
`

const WorkspaceData = styled.div`
    flex: 1;
    height: 100%;
    background-color: hsla(250,47.9%,45.7%,0.9);
    border-right: 1px solid hsla(0,0%,100%,0.16);
`

const WorkspaceDataHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Rubik', serif;
    color: #ffffff;
    border-bottom: 1px solid hsla(0,0%,100%,0.16);
    img {
        width: 40px;
        border-radius: 4px;
    }
`

const ColumsData = styled.div`
    width: 82%;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(45deg, rgba(133,20,239,1) 35%, rgba(226,0,255,1) 100%);
`

const HeaderColumns = styled.div`
    width: 100%;
    display: flex;
    background-color: #0000003d;
    padding: 20px;
`

const Left = styled.div`
    font-family: 'Rubik';
    font-weight: 700;
    font-size: 18px;
    h1 {
        color: #ffffff;
    }
`

const ColumnsContainer = styled.div`
    width: 100%;
    flex: 1;
    padding: 12px;
    display: flex;;
    gap: 12px;
    overflow: hidden;
    overflow-x: auto;
`