import { Box } from '@mui/material'

const BoardBar = () => {
  return (
    <div>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}></Box>
    </div>
  );
}

export default BoardBar
