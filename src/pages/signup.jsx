import styled from 'styled-components';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const { signup } = authService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName]= useState("");
    const navigate = useNavigate()

    async function signupSubmit(e){
        e.preventDefault();
        try {
            await signup({email, password, name});
            navigate('/');
        } catch (error) {
            toast('Não foi possível criar um e-mail com essas credenciais.')
        }
    }

    return (
        <ContainerLogin>
            <Form onSubmit={signupSubmit}>
                <ContainerInput>
                    <label htmlFor='name' >Name</label>
                    <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}/>
                </ContainerInput>
                <ContainerInput>
                    <label htmlFor='email' >e-mail</label>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </ContainerInput>
                <ContainerInput>
                    <label htmlFor='password'>password</label>
                    <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </ContainerInput>
                <button type='submit'>Entrar</button>
            </Form>
            <ContainerSignupLink>
                <p>Jpa possui uma conta? <Link to="/">Faça login aqui</Link></p>
            </ContainerSignupLink>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 200px;
`

const ContainerSignupLink = styled.div`
    p {
        font-family: 'Rubik', sans-serif;
        a {
            color: #703e27;
        }

    }
`

const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    label {
        font-family: 'Rubik', sans-serif;
        color: #281b15;
        font-weight: 500;
    }

    input {
        width: 240px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid #5f4133;
        padding-left: 10px;
        font-family: 'Rubik', sans-serif;
    }

    button {
        width: 120px;
        height: 40px;
        color: #ffffff;
        font-weight: bold;
        font-family: 'Rubik', sans-serif;
        background-color: #5f4133;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: 200ms;
        &:hover {
            background-color: #703e27;
        }
    }
`