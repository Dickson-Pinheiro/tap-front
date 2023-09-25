import styled from "styled-components"
import Header from "../components/Header"
import { BsThreeDots } from "react-icons/bs"
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import SortableColumn from "../components/board/SortableColumn";

const initialColumns = [
    {
        id: 1,
        title: "To do",
        cards: [
            {
                title: "Criar header das rotas não autenticadas",
                id: 1
            },
            {
                title: "Criar testes automatizados para validar entradas doca",
                id: 2
            }
        ]
    },
    {
        id: 2,
        title: "doing",
        cards: []
    },
    {
        id: 3,
        title: "done",
        cards: []
    }
];


export default function Board() {
    const [columns, setColumns] = useState(initialColumns);

    const onDragEnd = event => {
        console.log(event);
        const {active, over} = event;
        if(active.id === over.id){
            return
        }

        setColumns(columns => {
            const oldIndex = columns.findIndex(column => column.id === active.id)
            const newIndex = columns.findIndex(column => column.id === over.id)
            return arrayMove(columns, oldIndex, newIndex)
        })
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
                    <ColumnsContainer>
                        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
                                {columns.map(column => (
                                    <SortableColumn column={column} key={column.id}/>
                                ))}
                            </SortableContext>
                        </DndContext>
                    </ColumnsContainer>
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
    height: calc(100vh - 49px);
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
    display: flex;
    gap: 12px;
    overflow: hidden;
    overflow-x: auto;
`