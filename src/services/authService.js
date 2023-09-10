import axios from 'axios';

export function authService(){
    
    const api = axios.create({baseURL: import.meta.env.VITE_API_URL})

    const services = {
        async signup(user){
            return api.post('/auth/signup', {
                user
            })
        },
        async signin(user){
            const result = await api.post('/auth/signin', {
                user
            })
            localStorage.setItem("token", result.data.token)
        },

        async authVerify(token){
            return api.post('/auth/verify', {
                token
            })
        }
    }
    return services;
}