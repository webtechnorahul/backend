import axios from 'axios'

const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})
export async function userLogin(email,password) {
    const response=await api.post('/login',{email,password});
    console.log(response)
    return response.data;
}