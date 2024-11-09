import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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