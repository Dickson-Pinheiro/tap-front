import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Dash(){
    const navigate = useNavigate()
    return(
        <ContainerDash>
            <Container>
                <Button onClick={ () => navigate('/dash/notes')}>
                    notes
                </Button>
                <Button onClick={ () => navigate('/dash/checklists')}>
                    checklists
                </Button>     
            </Container>
        </ContainerDash>
    )
}

const ContainerDash = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    padding-top: 15px;
    justify-content: center;
`

const Button = styled.div`
    width: 130px;
    height: 80px;
    border-radius: 8px;
    padding: 8px;
    background-color: #5f4133;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Rubik', sans-serif;
    color: #ffffff;
    font-weight: bold;
    &:hover {
        background-color: #703e27;
    }
`

const Container = styled.div`
    max-width: 1100px;
    display: flex;
    justify-content: center;
    gap: 8px;
`