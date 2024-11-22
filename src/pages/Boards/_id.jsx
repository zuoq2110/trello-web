
import { Container } from '@mui/material'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis'
// import AppBar from '~/components/Appbar/AppBar.jsx'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { fetchBoardDetailsAPI, selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import AppBar from '~/components/Appbar/AppBar.jsx'

const Board = () => {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '66d5d575d234a41a425a241e'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])


  //func này có nhiệm vụ gọi api khi đã kéo thả xong xuôi
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }

    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))


    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //update state board
    // Cannot asign to read only property cards of object
    // Truong hop immutability o day dung toi gia tri cards dang dc coi la chi doc readonly - (nested object
    //   -can thiep sau du lieu)
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))


    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))


    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds

    })
  }

  if (!board) {
    return (
      <PageLoadingSpinner caption="Loading Board..." />
    )
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <ActiveCard />
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          board={board}
        />
      </Container>
    </>
  )
}

export default Board
