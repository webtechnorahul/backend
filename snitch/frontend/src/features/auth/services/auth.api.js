import axios from 'axios'

const api=axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

export async function UserRegister({name,email,password,role}) {
    
    const response=await api.post('/register',{name,email,password,role})
    
    return response.data;
}

export async function UserLogin(email,password) {
    const response=await api.post('/login',{email,password})
    return response.data;
}