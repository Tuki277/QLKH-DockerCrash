import axios from "axios";

const token = localStorage.getItem("accessToken")

const API = axios.create({
    // baseURL: "http://localhost:3333/api",
    baseURL: process.env.REACT_APP_IP_ACCESS,
    // baseURL: "http://103.170.123.27:3333/api", // deploy
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const APINonAuth = axios.create({
    baseURL: "http://localhost:3333/api"
})

export default API;