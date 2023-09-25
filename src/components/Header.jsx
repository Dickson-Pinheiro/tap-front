import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


export default function Header({backgroundColor, color}){
    const navigate = useNavigate();

    return(
        <HeaderContainer backgroundColor={backgroundColor} colorfill={color}>
                <Left colorfill={color}>
                <Logo onClick={() => navigate('/dash')} colorfill={color}>
                <p>tap</p>
                </Logo>
                <nav>
                    <ul>
                        <li><span>Workspaces</span> <BsChevronDown size={12} color={color |'#44546f'}/></li>
                    </ul>
                </nav>
                </Left>
                <Right>
                    <img src="https://github.com/Dickson-Pinheiro.png" />
                </Right>
            </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px;
    box-shadow: 0px 0px 1px #44546f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
    background-color: ${props => props?.backgroundColor ? props.backgroundColor : "#ffffff"};
`

const Logo = styled.div`
    p {
        font-size: 30px;
        font-family: 'Rubik', sans-serif;
        font-weight: 600;
        cursor: pointer;
        color: ${props => props?.colorfill ? props.colorfill : "#000"};
    }
    margin-left: 10px;
`

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
    width: 100%;
    max-width: 300px;
    ul {
        display: flex;
        gap: 8px;
        li {
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            padding: 8px;
            cursor: pointer;
            border-radius: 4px;
            color: ${props => props?.colorfill ? props.colorfill : "#000"};
            span {
                font-family: 'Lora', serif;
                font-size: 15px;
                font-weight: 500;
                color: ${props => props?.colorfill ? props.colorfill : "#44546f"};
            }
            svg {
                margin-top: 4px;
            }
            &:hover {
                background-color: #091E4224;
            }
        }

    }
`

const Right = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    img {
        width: 100%;
        border-radius: 50%;
        cursor: pointer;
    }
`