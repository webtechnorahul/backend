import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000/instagram/user',
    withCredentials:true
})
export async function getPost() {
    const response=await api.get('/allpost');
    return response.data;
}