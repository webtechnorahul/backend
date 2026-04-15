import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000/insta/user',
    withCredentials:true,
})
export async function userLogin(email,password){
    const response=await api.post('/login',{email,password})
    // console.log(response)
    return response.data;
}
export async function userRegister(username,email,mobile,password) {
    const response=await api.post('/register',{username,email,mobile,password})
    return response.data;
}
export async function userGetMe(){
    const response=await api.get('/get-me')
    return response.data;
}