import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload //action.payload la chuan dat ten nhan du lieu vao reducer

      state.currentActiveCard = fullCard
    }
  },
  extraReducers: (builder) => {}
})

//actions: la noi danh cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua
//reducer
//actions duoc redux tao tu dong theo ten cua reducer
export const { clearCurrentActiveCard, updateCurrentActiveCard} =activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const activeCardReducer = activeCardSlice.reducer