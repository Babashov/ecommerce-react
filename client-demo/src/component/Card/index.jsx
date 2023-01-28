import {Box,Image,Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Card() {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='3'>
        <Link to='#/'>
            <Image src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80' alt='products'/>
            <Box p="6">
                <Box d="flex" alignItems='baseline'>
                    12/12/2021
                </Box>
                <Box mt="1" fontWeight='semibold' as='h4' lineHeight='tight'>
                    Macbook Pro
                </Box>
                <Box>100 AZN</Box>
            </Box>
        </Link>
        <Button colorScheme="pink">Add to Basket</Button>
    </Box>
  )
}

export default Card