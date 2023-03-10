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

export const postProduct = async (input)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/product`,input)

    return data
}

export const fetchRegister = async (values)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,values)
    return data;
}

export const fetchSignin = async (values)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,values)
    return data;
}

export const fetchMe = async ()=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`)
    return data;
}

export const fetchLogout = async ()=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
        refresh_token:localStorage.getItem('refreshToken')
    })

    return data;
}

export const fetchOrder = async(values)=>{
    const {data} = axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`,values)

    return data;
}

export const fetchOrders = async()=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order`)
    return data;
}

export const deleteProduct = async (productId)=>{
    const {data} = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${productId}`)
    return data;
}

export const updateProduct = async(input,productId)=>{
    const {data} = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${productId}`,input)
    return data;
}