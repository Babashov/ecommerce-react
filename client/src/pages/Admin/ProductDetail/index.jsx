import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {fetchProduct,updateProduct} from '../../../api'
import {Formik,FieldArray} from 'formik'
import validationSchema from './validations'
import {Text,Box,FormControl,FormLabel,Input,Textarea,Button} from '@chakra-ui/react'
import {message} from 'antd'

function ProductDetail() {
  const {productId} = useParams()
  const {isLoading,isError,error,data} = useQuery(['admin:product',productId],()=>fetchProduct(productId))

  if(isLoading)
  {
    return <div>Loading...</div>
  }

  if(isError)
  {
    return <div>Error: {error.message}</div>
  }

  const handleSubmit = async (values,bag)=>{

    message.loading({content:'Loading',key:'product_update'})

    try {
      await updateProduct(values,productId)
      message.success({content:'The Product Updated',key:'product_update',duration:2})
    } catch (e) {
      message.error({content:`Error:${e.message}`,key:'product_update'})
    }
  }

  return (
    <div>
      <Text fontSize='2xl'>Edit</Text>
      <Formik
        initialValues={{
          title:data.title,
          description:data.description,
          price:data.price,
          photos:data.photos
        }}
        validationSchema={validationSchema}
        
        onSubmit={handleSubmit}
      >

        {

          ({handleSubmit,errors,touched,handleChange,handleBlur,values,isSubmitting})=>(
            <>
              <Box>

                <Box my={5} textAlign="left">
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name='title'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                      />
                      {touched.title && errors.title && <Text color='red'>{errors.title}</Text>}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                      />
                      {touched.description && errors.description && <Text color='red'>{errors.description}</Text>}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name='price'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.price && errors.price}
                      />
                      {touched.price && errors.price && <Text color='red'>{errors.price}</Text>}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Photos</FormLabel>
                      <FieldArray  
                        name='photos'
                        render={(arrayHelpers)=>(
                          <div>
                            {
                              values.photos && values.photos.map((photo,index)=>(
                                <div key={index}>
                                  <Input 
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    width='3xl'
                                  />

                                  <Button
                                    ml={4}
                                    type='button'
                                    colorScheme='red'
                                    onClick={()=>arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>

                                  

                                </div>
                              ))
                            }

                                  <Button
                                    mt={5}
                                    onClick={()=>arrayHelpers.push('')}
                                  >
                                    Add Photo
                                  </Button>
                          </div>
                        )}
                      />
                    </FormControl>

                    <Button
                      mt={4}
                      width='full'
                      type='submit'
                      isLoading={isSubmitting}
                    >
                      Update
                    </Button>

                  </form>
                </Box>

              </Box>
            
            </>
          )

        }

      </Formik>
    </div>
  )
}

export default ProductDetail