import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            // Only redirect if not already on auth pages
            if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
}

export const sweetsAPI = {
    getAllSweets: () => api.get('/sweets'),
    searchSweets: (params) => api.get('/sweets/search', { params }),
    addSweet: (data) => api.post('/sweets', data),
    updateSweet: (id, data) => api.put(`/sweets/${id}`, data),
    deleteSweet: (id) => api.delete(`/sweets/${id}`),
}

export const inventoryAPI = {
    purchaseSweet: (id) => api.post(`/inventory/${id}/purchase`),
    restockSweet: (id) => api.post(`/inventory/${id}/restock`),
}

export default api
