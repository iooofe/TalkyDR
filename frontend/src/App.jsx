import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import RegistrationPage from './pages/authentications/registration/RegistrationPage'
import LoginPage from './pages/authentications/login/LoginPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/registration" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
