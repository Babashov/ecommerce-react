import {useState,useEffect,createContext,useContext} from 'react'

const BasketContext = createContext()

export const BasketProvider = ({children})=>{
    const [items,setItems] = useState([])

    const addToBasket = (data,findBasketItem)=>{

        if(!findBasketItem)
        {
            return setItems((prevState)=>[...prevState,data])
        }

        const filteredBasketItems = items.filter((item)=>item._id !== findBasketItem._id)

        setItems(filteredBasketItems)


    }

    const values = {
        items,
        setItems,
        addToBasket
    }

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}

export const useBasket = ()=>useContext(BasketContext)