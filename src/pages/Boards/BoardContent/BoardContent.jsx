import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = () => {

  return (
    <div>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns />

      </Box>
    </div>
  )
}

export default BoardContent
