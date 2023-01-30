import axios from 'axios'

axios.interceptors.request.use(function (config) {
    const {origin} = new URL(config.url)
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]
    const token = localStorage.getItem('token')
    
    if(allowedOrigins.includes(origin))
    {
        config.headers.Authorization = token
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const fetchProductsList = async ({ pageParam = 1 })=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`)

    return data
}

export const fetchProduct = async (id)=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`)

    return data
}

export const fetchRegister = async (values)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,values)
    return data;
}

export const fetchMe = async ()=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`)
    return data;
}