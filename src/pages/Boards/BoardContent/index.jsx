import { Box } from '@mui/material'
const BoardContent = () => {
  return (
    <div>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}></Box>
    </div>
  );
}

export default BoardContent
