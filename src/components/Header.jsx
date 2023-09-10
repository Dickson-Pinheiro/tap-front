import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


export default function Header(){
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/");

    }

    return(
        <HeaderContainer>
            <Container>
            <h1 onClick={() => navigate('/dash')}>NOTAS</h1>
            <Logout>
                <p onClick={handleLogout}>Sair</p>
            </Logout>
            </Container>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 40px;
    background-color: #5f4133;
    font-family: 'Rubik', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px;
    h1 {
        font-size: 20px;
        font-weight: 500;
        color: white;
        cursor: pointer;
    }
`

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Logout = styled.div`
    p {
        font-size: 15px;
        font-weight: 500;
        color: white;
        cursor: pointer;
    }
`