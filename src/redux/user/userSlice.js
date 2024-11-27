import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/pages/utils/authorizeAxios'
import { API_ROOT } from '~/pages/utils/constants'

//Khoi tao gia tri State cua 1 slice trong redux
const initialState = {
  currentUser: null
}

//Cac hanh dong goi api (bat dong bo) va cap nhat du lieu vao redux, dung middleware createAsyncThunk di kem
//voi extraReducers
export const loginUserApi = createAsyncThunk(
  'activeBoard/loginUserApi',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const loginUserWithGoogle = createAsyncThunk(
  'activeBoard/loginUserWithGoogle',
  async (token) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/loginWithGoogle`, {token})
    return response.data
  }
)

export const logoutUserApi = createAsyncThunk(
  'user/logoutUserApi',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const updateUserApi = createAsyncThunk(
  'user/updateUserApi',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.data
  }
)

//Khoi tao mot cai slice trong kho luu tru - redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //Reducers: noi xu ly du lieu dong bo
  reducers: {
  },
  //extraReducers: Noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      //action.payload o day chinh la response.data tra ve o tren
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(logoutUserApi.fulfilled, (state) => {
      // API logout sau khi goi thanh cong thi se clear thong tin currentUser ve null o day
      //Ket hop ProtectedRoute da lam o App.js => code se dieu huong chuan ve trang Login
      state.currentUser = null
    })
    builder.addCase(updateUserApi.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(loginUserWithGoogle.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions

//Selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu trong
//kho redux store ra su dung
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}


export const userReducer = userSlice.reducer