import { createContext,useContext,useState } from "react";
import {fetchMe} from '../api'
import { Flex, Spinner } from "@chakra-ui/react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [loggedIn,setLoggedIn] = useState(false)
    const [loading,setLoading] = useState(true)

    useState(()=>{

        (async ()=>{
            
            try {
                const me = await fetchMe()
                setLoggedIn(true)
                setUser(me)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }


        })()

    },[])

    const login = (data)=>{
        setLoggedIn(true)
        setUser(data)
        localStorage.setItem('token',data.accessToken)
        localStorage.setItem('refreshToken',data.refreshToken)
    }

    const values = {
        user,
        loggedIn,
        login
    }

    if(loading) (
        <Flex justifyContent='center' alignItems="center" height="100vh">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500"/>
        </Flex>
    )

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>useContext(AuthContext)