import { Route, Routes } from 'react-router-dom'
import AuthLayout from '@/components/Layouts/AuthLayout'
import MainLayout from '@/components/Layouts/MainLayout'
import { ProtectedRoute } from '@/middleware/ProtectedRoute'
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'
import Signup from './pages/auth/Signup'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute allowedRoles={['Public']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
