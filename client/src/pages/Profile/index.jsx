import { useAuth } from "../../contexts/AuthContext"

function Profile() {
    const {user} = useAuth()
  return (
    <div>Profile: <code>{JSON.stringify(user)}</code></div>
  )
}

export default Profile