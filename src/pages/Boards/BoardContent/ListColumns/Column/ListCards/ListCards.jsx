
import { Box } from '@mui/material'
import Card from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


const ListCards = ({ cards }) => {
  return (
    <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '0 5px 5px 5px',
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
        {cards?.map(card => <Card key={card._id} card={card} />)}

      </Box>
    </SortableContext>
  );
}

export default ListCards;
