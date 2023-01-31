import {Box,Image,Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import {useBasket} from '../../contexts/BasketContext'

function Card({item}) {
const {items,addToBasket} = useBasket()
const findBasketItem = items.find((basketItem)=>basketItem._id === item._id)
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='3'>
        <Link to={`/product/${item._id}`}>
            <Image src={item.photos[0]} alt='products' loading='lazy'/>
            <Box p="6">
                <Box d="flex" alignItems='baseline'>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                </Box>
                <Box mt="1" fontWeight='semibold' as='h4' lineHeight='tight'>
                    {item.title}
                </Box>
                <Box>{item.price} AZN</Box>
            </Box>
        </Link>
        <Button 
            onClick={()=>addToBasket(item,findBasketItem)}
            colorScheme={findBasketItem ? 'pink' : 'green'}
        >
            {findBasketItem ? 'Remove From Basket' : 'Add to Basket'}
        </Button>
    </Box>
  )
}

export default Card