import styled from 'styled-components';
import {BiLockAlt} from 'react-icons/bi';
import {IoPersonOutline} from 'react-icons/io5'
import Header from '../components/Header';
import Workspaces from '../components/Workspaces';
import { useNavigate } from 'react-router-dom';

export default function Dash(){
    const navigate = useNavigate();
    return(
        <ContainerDash>
            <Header/>
            <Container>
                <Workspaces />
                <QuadrosContainer>
                    <ContainerQuadros>
                        <HeaderQuadros>
                            <img src="https://github.com/Dickson-Pinheiro.png" />
                            <ContentHeaderQuadros>
                                <h1>Bandeira Comunicação</h1>
                                <Lock>
                                <BiLockAlt color='#44546f' size={12}/>
                                <p>Privado</p>
                                </Lock>
                            </ContentHeaderQuadros>
                        </HeaderQuadros>
                        <Content>
                            <HeaderContentQuadros>
                                <IoPersonOutline size={20}/>
                                <h2>Seus quadros</h2>
                            </HeaderContentQuadros>
                            <Quadros>
                                <Quadro color1="rgba(247,9,9,1)" color2="rgba(196,0,255,1)" onClick={() => navigate('/board')}>
                                    <h3>Bandeira Comunicação</h3>
                                </Quadro>
                                <Quadro color1="rgba(133,20,239,1)" color2="rgba(226,0,255,1)" onClick={() => navigate('/board')}>
                                    <h3>Glow - Campanha de lançamento</h3>
                                </Quadro>
                                <Quadro color1="rgba(239,178,20,1)" color2="rgba(255,248,0,1)" onClick={() => navigate('/board')}>
                                    <h3>Revistaria Conceito</h3>
                                </Quadro>
                            </Quadros>
                        </Content>
                    </ContainerQuadros>
                </QuadrosContainer>
            </Container>
        </ContainerDash>
    )
}

const ContainerDash = styled.div`
    width: 100%;
`
const Container = styled.div`
    display: flex;
    padding-top: 25px;
    margin-top: 49px;
    min-height: calc(100vh - 49px);
`

const QuadrosContainer = styled.div`
    flex: 1;
`

const ContainerQuadros = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 12px;
`

const HeaderQuadros = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #ffffff;
    padding: 12px;
    width: 100%;
    -webkit-box-shadow: -1px 8px 1px -8px #44546f;
    -moz-box-shadow: -1px 8px 1px -8px #44546f;
    box-shadow: -1px 8px 1px -8px #44546f;
    img {
        width: 65px;
        border-radius: 4px;
    }
`

const ContentHeaderQuadros = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    h1 {
        font-family: 'Rubik', sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #172b4d;
    }
    p {
        font-family: 'Rubik', sans-serif;
        color: #44546f;
        font-size: 12px;
    }
`

const Lock = styled.div`
    display: flex;
    gap: 3px;
    justify-content: center;
    align-items: center;
    width: fit-content;
`

const Content = styled.div`
    width: 100%;
    padding-top: 26px;
`

const HeaderContentQuadros = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 16px;
    color: #172b4d;
    h2 {
        font-family: 'Lora', serif;
        font-weight: 700;
        font-size: 16px;
    }
`

const Quadros = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`

const Quadro = styled.div`
    width: 220px;
    height: 120px;
    font-family: 'Rubik', serif;
    color: white;
    font-weight: 700;
    font-size: 14px;
    padding: 14px;
    background: linear-gradient(45deg, ${props => props.color1} 35%,${props => props.color2} 100%);
    border-radius: 6px;
    cursor: pointer;
`