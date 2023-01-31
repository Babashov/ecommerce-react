import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@chakra-ui/react"

function Profile({history}) {
    const {user,logout} = useAuth()
    const handleLogout = async ()=>{
        logout()
    }
  return (
    <div>
        Profile: <code>{JSON.stringify(user)}</code>
        <br/><br/>
        <Button colorScheme='pink' variant='solid' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile