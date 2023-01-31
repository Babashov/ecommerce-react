import { Alert, Box, Button, Image,Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {useBasket} from '../../contexts/BasketContext'
function Basket() {
    const {items,removeItem} = useBasket()
    const total = items.reduce((acc,obj)=>acc+obj.price,0)
  return (
    <Box p={5}>

        {items.length < 1 && (
            <Alert status='warning'>You have not any items in your basket</Alert>
        )}

        {items.length > 0 && (
            <>
            
                <ul>
                    {items.map((item)=>(
                        <li key={item._id} style={{marginBottom:'15px', listStyleType:'decimal'}}>
                            <Link to={`/product/${item._id}`}>
                                {item.title} - {item.price} AZN
                                <Image htmlWidth={200} src={item.photos[0]} alt='basket item' loading='lazy'/>
                            </Link>
                            <Button 
                                mt={2} 
                                size='sm' 
                                colorScheme='pink' 
                                onClick={()=>{removeItem(item._id)}}
                            >
                                Remove from basket

                            </Button> 
                        </li>
                    ))}
                </ul>


                <Box mt={10}>
                    <Text>Total : {total} AZN</Text>
                </Box>

            </>
        )}

    </Box>
  )
}

export default Basket