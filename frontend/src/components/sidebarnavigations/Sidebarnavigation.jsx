import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import './Sidebarnavigation.css'

function Sidebarnavigation () {
    return (
       <Link to = {'/myprofile'}><User/><h2 className = "navigation-text">Мой профиль</h2></Link>
    )
}

export default Sidebarnavigation    