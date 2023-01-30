import { useQuery } from 'react-query'
import { Grid } from '@chakra-ui/react'
import Card from '../../component/Card'
import React from 'react'
import { fetchProductsList } from '../../api'

function Products() {
  const { isLoading, error, data } = useQuery('products', fetchProductsList)
 
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
   console.log("data",data)
  return (
    <div>

        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
          {data.map((item,index)=><Card key={index} item={item} />)}
        </Grid>

    </div>
  )
}

export default Products