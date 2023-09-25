import { BsChevronDown } from "react-icons/bs"
import styled from "styled-components"

export default function Workspaces(){
    return(
        <WorkspacesContainer>
                    <Content>
                        <AddWorkspace>
                            <p>Workspaces</p>
                            <span>+</span>
                        </AddWorkspace>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                        <WorkContainer>
                            <WorkData>
                            <img src='https://github.com/Dickson-Pinheiro.png' />
                            <h2>Bandeira Comunicação</h2>
                            </WorkData>
                            <BsChevronDown size={13} color='#44546f'/>
                        </WorkContainer>
                    </Content>
                </WorkspacesContainer>
    )
}

const AddWorkspace = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    width: 100%;
    p {
        font-family: 'Rubik', sans-serif;
        color: #44546f;
        font-size: 12px;
    }
    span {
        cursor: pointer;
        color: #44546f;
        font-size: 20px;
        font-weight: 600;
    }
`

const WorkspacesContainer = styled.div`
    max-width: 450px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
`

const Content = styled.div`
    position: fixed;
    top: 83px;
    left: calc(9% - 40px);
    width: 100%;
    max-width: 310px;
    max-height: calc(100vh - 200px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const WorkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #091E4224;
    }
`

const WorkData = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    img {
        width: 30px;
        border-radius: 4px;
    }
    h2 {
        font-family: 'Rubik', sans-serif;
        font-size: 15px;
        font-weight: 400;
        color: #172b4d;
    }
`