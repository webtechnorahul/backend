import axios from 'axios'

const api=axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

export async function UserRegister({name,email,password,role}) {
    
    const response=await api.post('/register',{name,email,password,role},{ withCredentials: true })
    
    return response.data;
}

export async function UserLogin({email,password}) {
    const response=await api.post('/login',{email,password})
    return response.data;
}

export async function getUser(){
    const response=await api.get('/getuser')
    return response.data;
}

export async function GoogleLogin(){
    window.location.href = "http://localhost:3000/api/auth/google";
}
export async function userLogout() {
    const response = await api.post('/logout');
    return response.data;
}