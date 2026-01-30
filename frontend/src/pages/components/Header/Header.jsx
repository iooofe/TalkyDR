import './Header.css'
import { Link } from 'react-router-dom'
import profile from '../../../assets/icons/profile.svg'
import feed from '../../../assets/icons/feed.svg'

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-card">
                <h1>Talky</h1>
                <div className="header-navigation">
                    <Link to="/" className="header-img-link">
                        <img className="header-img" src={feed} alt="Feed" />
                    </Link>
                    <Link to="/myprofile" className="header-img-link">
                        <img className="header-img" src={profile} alt="My Profile" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header