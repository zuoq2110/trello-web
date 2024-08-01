import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/pages/utils/sorts'

const BoardContent = ({ board }) => {
const orederedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
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
        <ListColumns columns={orederedColumns} />

      </Box>
    </div>
  )
}

export default BoardContent
