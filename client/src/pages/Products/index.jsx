import { useInfiniteQuery } from 'react-query'
import { Grid,Button,Box,Flex } from '@chakra-ui/react'
import Card from '../../component/Card'
import React from 'react'
import { fetchProductsList } from '../../api'

function Products() {
  const { 
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status, 
  } =   useInfiniteQuery('products', fetchProductsList,{
      
    getNextPageParam:(lastPage, pages)=> {
      const morePageExist = lastPage?.length === 12;
      
      if(!morePageExist) return;

     return pages.length +1;

    },

  })
 
   if (status === 'loading') return 'Loading...'
 
   if (status === 'error') return 'An error has occurred: ' + error.message

  return (
    <div>

        {/* <Grid templateColumns='repeat(3, 1fr)' gap={4}>
          {data.map((item,index)=><Card key={index} item={item} />)}
        </Grid> */}
        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          
          {group.map((item) => (
            <Box width="100%" key={item._id}>
              <Card item={item} />
            </Box>
          ))}
          
        </React.Fragment>
      ))}
      
      </Grid>

      <Flex mt="10" justifyContent="center">
        <Button display="flex" flexDirection="center"
          onClick={() => fetchNextPage()}
          isLoading={isFetching ? true : false}
          isDisabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Flex>

    </div>
  )
}

export default Products