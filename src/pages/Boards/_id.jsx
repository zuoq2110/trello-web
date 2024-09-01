
import { Container } from '@mui/material'
import AppBar from '~/components/Appbar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
const Board = () => {
  const [board,setBoard] = useState(null)

  useEffect(()=>{
    const boardId = '66d40cd81000bc8fac65340f'
    fetchBoardDetailsAPI(boardId).then((board)=>{
      setBoard(board)
    })
  },[])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board}/>
        <BoardContent board={board}/>
      </Container>
    </>
  )
}

export default Board
