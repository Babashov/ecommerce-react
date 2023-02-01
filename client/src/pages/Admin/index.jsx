import { Box } from "@chakra-ui/react"
import { Outlet,Link } from "react-router-dom"
import './style.css'

function Admin() {
  return (
    <div>
        <nav>
            <ul className='admin-menu'>
                <li>
                    <Link to='/admin'>Home</Link>
                </li>
                <li>
                    <Link to='orders'>Orders</Link>
                </li>
                <li>
                    <Link to='products'>Products</Link>
                </li>
            </ul>
        </nav>
        <Box mt='10'>
            <Outlet/>
        </Box>
    </div>
  )
}

export default Admin