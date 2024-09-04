
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
    const boardId = '66d5d575d234a41a425a241e'
    fetchBoardDetailsAPI(boardId).then((board)=>{
      setBoard(board)
    })
  },[])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={mockData.board}/>
        <BoardContent board={mockData.board}/>
      </Container>
    </>
  )
}

export default Board
