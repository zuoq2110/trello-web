import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/pages/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/pages/utils/constants'
import { generatePlaceholderCard } from '~/pages/utils/formatters'
import { mapOrder } from '~/pages/utils/sorts'

//Khoi tao gia tri State cua 1 slice trong redux
const initialState = {
  currentActiveBoard: null
}

//Cac hanh dong goi api (bat dong bo) va cap nhat du lieu vao redux, dung middleware createAsyncThunk di kem
//voi extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)
//Khoi tao mot cai slice trong kho luu tru - redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  //Reducers: noi xu ly du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload

      //Xu ly du lieu can thiet

      //update lai du lieu cua currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      //update nested data
      const incomingCard = action.payload

      //Tìm dần từ board > column > card
      const column = state.currentActiveBoard.columns.find(i => i._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find(i => i._id === incomingCard._id)
        if (card) {
          card.title = incomingCard.title
        }
      }
    }
  },
  //extraReducers: Noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.payload o day chinh la response.data tra ve o tren
      let board = action.payload
      //sap xep cac du lieu truoc khi dua xuong cac component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        //khi f5 trang web thi can xu li van de keo tha vao 1 column rong
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          //sap xep thu tu cac cards truoc khi dua xuong cac component con
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })
      //update lai du lieu cua currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions

//Selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu trong 
//kho redux store ra su dung
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}


export const activeBoardReducer = activeBoardSlice.reducer