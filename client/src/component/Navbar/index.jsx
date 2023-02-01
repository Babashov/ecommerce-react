import styles from './style.module.css'
import { Link } from "react-router-dom"
import { Button } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import {useBasket} from '../../contexts/BasketContext'

function Navbar() {

  const {items} = useBasket()
  const {loggedIn,user} = useAuth()


  return (
    <nav className={styles.nav}>
       <div className={styles.left}>
            <div className={styles.logo}>
                <Link to='/'>eCommerce</Link>
            </div>

            <ul className={styles.menu}>
                <li><Link to="/">Products</Link></li>      
            </ul>
       </div>
       
       <div className={styles.right}>

          {loggedIn && (

              <>

              {user?.role === 'admin' && (
                <Link to='/admin'>
                  <Button colorScheme='pink' variant='ghost'>
                    Admin
                  </Button>
                </Link>
              )}
              
              {items.length > 0 && (
                <Link to='/basket'>
                  <Button 
                    colorScheme='pink' 
                    variant='outline'
                  >

                    Basket ({items.length})

                  </Button>
                </Link>
              )}

             

              <Link to='profile'>
              <Button>Profile</Button>
              </Link>
              
              </>

          )}

          {
            !loggedIn && (

              <>
              
              <Link to='signin'>
                <Button colorScheme='pink'>Login</Button>
              </Link>
              
              <Link to='signup'>
                  <Button colorScheme='pink'>Register</Button>
              </Link>
              
              </>

            )
          }
        
       </div>

    </nav>
  )
}

export default Navbar