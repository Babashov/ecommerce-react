import { useMemo } from 'react'
import {useQuery,useMutation,useQueryClient} from 'react-query'
import {fetchProductsList,deleteProduct} from '../../../api'
import {Table,Popconfirm} from 'antd'
import {Button, Text, Flex} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Products() {
  const queryClient = useQueryClient()
  const {isLoading,isError,error,data} = useQuery('admin:products',fetchProductsList)

  const deleteMutation = useMutation(deleteProduct,{
    onSuccess:()=>queryClient.invalidateQueries('admin:products')
  })

  const columns = useMemo(()=>{
    return [
      {
        title:'Title',
        dataIndex:'title',
        key:'title'
      },
      {
        title:'Price',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'Created At',
        dataIndex:'createdAt',
        key:'createdAt'
      },
      {
        title:'Action',
        key:'action',
        render:(text,record)=>(
          <>
          
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
  
            <Popconfirm
              title='Are you sure'
              onConfirm={()=>{
                deleteMutation.mutate(record._id,{
                  onSuccess:()=>{
                    console.log('Successfully deleted');
                  }
                })
              }}
              onCancel={()=>console.log('Canceled')}
              okText='Beli'
              cancelText='Xeyr'
              placement='right'
            >
              <a href='/#' style={{marginLeft:10}}>Delete</a>
            </Popconfirm>
  
          </>
        )
      }
    ]
  },[])

  if(isLoading)
  {
    return <div>Loading...</div>
  }

  if(isError)
  {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize="2xl" p='5'>Products</Text>
        <Link to='new'>
          <Button>New</Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey="_id"/>
    </div>
  )
}

export default Products