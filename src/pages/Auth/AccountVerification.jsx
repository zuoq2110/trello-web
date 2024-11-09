import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserApi } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  let [searchParams] = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])

  //Tao mot bien state de viet duoc da verify thanh cong chua
  const [verified, setVerified] = useState(false)
  // Goi api de verify tai khoan
  useEffect(() => {
    if (email && token) {
      verifyUserApi({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  //Neu url khong ton tai 1 trong 2 gia tri email hoac token thi da ra trang 404
  if (!email || !token) {
    return <Navigate to="/404" />
  }

  // Neu chua verify xong thi hien loading
  if (!verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />
  }
  // Cuoi cung neu k gap van de gi + voi verify thanh cong thi dieu huong ve trang login voi gia tri verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification