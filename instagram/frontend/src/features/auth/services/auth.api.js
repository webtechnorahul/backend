import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:3000/instagram/user",
    withCredentials:true
})
export async function loginUser(email,password) {
    const response=await api.post("/login", { email, password })
    return response.data;
}
export async function registerUser(username,email,mobile,password) {
    const response=await api.post("/register", { username,email,mobile,password })
    return response.data;
}