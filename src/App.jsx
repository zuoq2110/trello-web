import NotFound from './pages/404/NotFound'
import AccountVerification from './pages/Auth/AccountVerification'
import Auth from './pages/Auth/Auth'
import Board from './pages/Boards/_id'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings/Settings'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}
function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        <Navigate to='/boards/66d5d575d234a41a425a241e' replace={true} />
      } />

      {/* Protected Routes hieu don gian trong du an cua chung ta la nhung route chi
      cho truy cap khi da login */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* <Outlet /> cua react-router-dom se chay vao cac child route trong nay */}
        {/* Board Details */}
        <Route path='/boards/:boardId' element={<Board />} />
        {/* User Settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />

      </Route>

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      {/* 404 Not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes >
  )
}

export default App
