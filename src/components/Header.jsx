import styled from 'styled-components';

export default function Header(){
    return(
        <HeaderContainer>
            <h1>NOTAS</h1>
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
    h1 {
        font-size: 20px;
        font-weight: 500;
        color: white;
    }
`