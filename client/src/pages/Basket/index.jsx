import { useRef,useState } from 'react'
import { 
    Alert, 
    Box, 
    Button, 
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    useDisclosure,
    Textarea,
    FormControl,
    FormLabel
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import {useBasket} from '../../contexts/BasketContext'
import { fetchOrder } from '../../api'

function Basket() {
    const {items,removeItem,emptyBasket} = useBasket()
    const total = items.reduce((acc,obj)=>acc+obj.price,0)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [address,setAddress] = useState('Ehmedli')

    const handleSubmit = async ()=>{
        const items_id = items.map((item)=>item._id)
        
        const input = {
            items:JSON.stringify(items_id),
            address
        }

        await fetchOrder(input)
        emptyBasket()
        onClose()
    }

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
                    <Button mt={5} colorScheme='green' onClick={onOpen}>Order</Button>
                </Box>



                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Textarea ref={initialRef} placeholder='Address' onChange={(e)=>setAddress(e.target.value)} />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleSubmit} type='submit' colorScheme='blue' mr={3}>
                        Order
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>

            </>
        )}

    </Box>
  )
}

export default Basket