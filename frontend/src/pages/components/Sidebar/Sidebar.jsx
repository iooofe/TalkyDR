import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar-card">
            <h1>Talky</h1>
            <hr />
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to="/myprofile"><span>My Profile</span></Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/feed"> <span>Feed</span></Link>
                </li>
            </ul>
        </div>

    )
}

export default Sidebar