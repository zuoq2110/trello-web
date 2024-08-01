import { Box, Button } from '@mui/material'
import Column from './Column/Column';
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

const ListColumns = ({ columns }) => {

  return (
    <SortableContext items={columns.map(c=> c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}>
        {columns?.map((column) =>
          <Column key={column._id} column={column} />
        )}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          bgcolor: '#ffffff3d',
          height: 'fit-content',
          borderRadius: '6px',
          mx: 2
        }}>
          <Button startIcon={<NoteAddIcon />} sx={{
            color: 'white',
            justifyContent: 'flex-start',
            width: '100%',
            pl: 2.5,
            py: 1
          }}>
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
