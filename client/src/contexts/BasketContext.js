import {useState,useEffect,createContext,useContext} from 'react'

const BasketContext = createContext()

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || []

export const BasketProvider = ({children})=>{
    const [items,setItems] = useState(defaultBasket)

    useEffect(()=>{
        localStorage.setItem('basket',JSON.stringify(items))
    },[items])

    const addToBasket = (data,findBasketItem)=>{

        if(!findBasketItem)
        {
            return setItems((prevState)=>[...prevState,data])
        }

        const filteredBasketItems = items.filter((item)=>item._id !== findBasketItem._id)

        setItems(filteredBasketItems)


    }

    const removeItem = (item_id)=>{
        const filetered = items.filter((item)=>item._id !== item_id)
        setItems(filetered)
    }

    const emptyBasket = ()=>{
        setItems([])
    }

    const values = {
        items,
        setItems,
        addToBasket,
        removeItem,
        emptyBasket
    }

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}

export const useBasket = ()=>useContext(BasketContext)