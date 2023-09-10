import axios from "axios"

export function listsService(){
    const token = localStorage.getItem("token");
    const api = axios.create({baseURL: import.meta.env.VITE_API_URL, headers: {
        Authorization: `Bearer ${token}`
    }});

    const services = {
        
        async getLists(){
            return api.get('/lists');            
        },
        
        async getOneList(id){
            return api.get(`/lists/${id}`);
        },

        async createList(list){
            return api.post('/lists', {list});
        },

        async updateList(list, id){
            return api.put(`/lists/${id}`, {list});
        },

        async removeList(id){
            return api.delete(`/lists/${id}`);
        }
    }

    return services;
}