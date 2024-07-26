
import { Box } from '@mui/material'
import Card from './Card/Card';


const ListCards = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      p: '0 5px',
      m: '0 5px',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)}
     - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`,
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da',
        borderRadius: '8px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#bfc2cf'
      }
    }}>
      <Card />
      <Card temporaryHideMedia/>
      <Card temporaryHideMedia/>
      <Card temporaryHideMedia/>
      <Card temporaryHideMedia/>
      <Card temporaryHideMedia/>
      <Card temporaryHideMedia/>
      <Card temporaryHideMedia/>
    </Box>
  );
}

export default ListCards;
