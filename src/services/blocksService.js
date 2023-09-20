import axios from "axios";

export function blocksService(){
    const token = localStorage.getItem("token");
    const api = axios.create({baseURL:import.meta.env.VITE_API_URL, headers: {
        Authorization: `Bearer ${token}`
    }});

    const service = {
        async getBlocks(){
            return api.get('/blocks');
        },

        async getOneBlock(id){
            return api.get(`/blocks/${id}`);
        },

        async createBlock(block){
            return api.post('/blocks', {block});
        },

        async updateBlock(id, block){
            return api.put(`/blocks/${id}`, {block});
        },

        async removeBlock(id){
            return api.delete(`/block/${id}`);
        }

    }

    return service;
}