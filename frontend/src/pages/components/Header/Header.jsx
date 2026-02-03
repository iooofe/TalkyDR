import './Header.css'
import { LogOut } from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/login', { replace: true })
    }


    return (
        <div className="header-inner">
            <span> </span>
            <button onClick={logout} className = "logout"><LogOut /></button>
        </div>
    )
}

export default Header