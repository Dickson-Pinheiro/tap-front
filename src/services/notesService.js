import axios from 'axios';


export function noteService(){
    const token = localStorage.getItem("token");
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
    )
    const services = {
        async getNotes(){
            const notes = await api.get("/notes");
            return notes;
        },
        
        async createNotes(Content){
            const notes = await api.post("/notes", {
                note: {
                Content
            }})
            return notes;
        },

        async getOneNote(id){
            const note = await api.get(`/notes/${id}`);
            return note;
        },
        async updateNote(Content, id){
            const notes = await api.put(`/notes/${id}`, {
                note: {
                Content
            }})
            return notes;
        },
        async deleteNote(id){
            await api.delete(`/notes/${id}`);
        },
    }
    
    return services
}