import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjkwZWVjMTA5MTdlYWY1NzgzY2U3MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4OTg0OTYzMSwiZXhwIjoxNjkwMTA4ODMxfQ.eh44ESpk4Oml8njJTGp0PcYi4xQ1i2bJSuW5U3YGMKQ"


export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header:{token:`Bearer ${TOKEN}`},
});

