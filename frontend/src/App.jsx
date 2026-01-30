import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegistrationPage from './pages/authentications/registration/RegistrationPage'
import LoginPage from './pages/authentications/login/LoginPage'
import MyProfile from './pages/main/myprofile/MyprofilePage'
import RequireAuth from './pages/components/RequireAuth'
import Authlayout from './pages/layouts/Authlayout'
import Mainlayout from './pages/layouts/Mainlayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Authlayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>

        <Route element={<Mainlayout />}>
          <Route path="/myprofile" element={<RequireAuth><MyProfile /></RequireAuth>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
