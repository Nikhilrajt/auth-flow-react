import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000"
});

export const getUserByEmail = async (email) => {
    const response = await API.get("/users", {
        params: {
            email
        }
    });

    return response.data;
};

export const getUserById = async (id) => {
    const response = await API.get(`/users/${id}`);

    return response.data;
};

export const checkUsername = async (username) => {
    const response = await API.get("/users", {
        params: {
            username
        }
    });

    return response.data;
};

export const createUser = async (userData) => {
    const response = await API.post("/users", userData);

    return response.data;
};

export const verifyUserEmail = async (id) => {
    const response = await API.patch(`/users/${id}`, {
        emailVerified: true
    });

    return response.data;
};

export default API;