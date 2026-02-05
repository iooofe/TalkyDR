import './Me.css'
import State from '../State/State'

function Me () {
    return (
        <div className = "me-card">
            <div className = "me-card-header">
                <img src="" alt="" className = "avatar" />
                <h1>Name</h1>
                <p className = "username">Username</p>
            </div>
            <div className = "state">
                <State />
                <State />
                <State />
            </div>
        </div>
    )
}

export default Me