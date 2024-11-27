export const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse()
    console.log('newAuthRes', newAuthRes)
    console.log('new auth Token:', newAuthRes.id_token)

    setTimeout(refreshToken, refreshTiming)
  }

  setTimeout(refreshToken, refreshTiming)
}