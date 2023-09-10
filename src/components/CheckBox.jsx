import { BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { listsService } from "../services/listsService";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function CheckBox({title, id, updateLists, setUpdateLists}){
    const navigate = useNavigate()
    const { removeList } = listsService()
    
    async function edit(){
        navigate(`/dash/checklists/edit/${id}`)
    }

    async function removeCheckList(){
        try {
            await removeList(id)
        setUpdateLists(!updateLists)
        } catch (error) {
            toast("Sua sessão expirou.")
            navigate("/")
        }
    }

    return(
        <Container>
            <span onClick={removeCheckList}>
                <BsTrash3Fill />
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
    align-items: center;
    &:hover {
        background-color: #703e27;
    }
`