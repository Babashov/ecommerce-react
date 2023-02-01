import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { fetchProduct } from "../../api"
import { Button, Text, Box } from "@chakra-ui/react"
import moment from 'moment'
import ImageGallery from 'react-image-gallery';
import { useBasket } from "../../contexts/BasketContext"
import { useAuth } from "../../contexts/AuthContext"


function ProductDetail() {
    const {loggedIn} = useAuth()
    const {productId} = useParams()
    const {addToBasket,items} = useBasket()
    const {isLoading,isError,data} = useQuery(['product',productId],()=>{
        return fetchProduct(productId)
    })

    
    
    if(isLoading) return <div>Loading...</div>

    if(isError) return <div>Error</div>

    const images = data.photos.map((url)=>({original:url}))

    const findBasketItem = items.find((item)=>item._id === productId)

  return (
    <div>
        {loggedIn && (
          <Button colorScheme={findBasketItem ? 'pink' : 'green'} onClick={()=>addToBasket(data,findBasketItem)} >{findBasketItem ? 'Remove From Basket' : 'Add Basket'}</Button>
        )}
        <Text as="h2" fontSize="2xl">{data.title}</Text>
        <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
        <p>{data.description}</p>
        <Box margin='10'>
            <ImageGallery items={images} />
        </Box>
    </div>
  )
}

export default ProductDetail