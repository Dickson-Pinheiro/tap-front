import { BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { listsService } from "../services/listsService";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

export default function CheckBox({title, id, updateLists, setUpdateLists}){
    const navigate = useNavigate()
    const { removeList } = listsService()
    const [load, setLoad] = useState(false);
    
    async function edit(){
        if(load){
            return
        }
        navigate(`/dash/checklists/edit/${id}`)
    }

    async function removeCheckList(){
        setLoad(true);
        try {
            await removeList(id)
            setUpdateLists(!updateLists)
        } catch (error) {
            setLoad(false);
            toast("Sua sessão expirou.")
            navigate("/")
        }
    }

    return(
        <Container>
            <span >
                {load ? <Oval width={15} height={15} color="#ffffff" secondaryColor="#703e27"/> :<BsTrash3Fill onClick={removeCheckList}/>}
            </span>
        <CheckBoxContainer onClick={edit}>
            <p>{title}</p>
        </CheckBoxContainer>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    span {
        position: absolute;
        right: 8px;
        top: 8px;
        color: #ffffff;
        visibility: hidden;
        z-index: 3;
        cursor: pointer;
        svg {
            color: #ffffff;
        }
    }
    &:hover {
        span {
            visibility: visible;
        }
    }
    @media(max-width: 800px){
        span {
            visibility: visible;
        }
    }
`

const CheckBoxContainer = styled.div`
    position: relative;
    z-index: 2;
    width: 200px;
    height: 60px;
    background-color: #5f4133;
    border-radius: 8px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    padding: 8px;
    align-items: center;
    &:hover {
        background-color: #703e27;
    }
`