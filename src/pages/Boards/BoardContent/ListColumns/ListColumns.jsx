import { Box, Button } from '@mui/material'
import Column from './Column/Column';
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const ListColumns = () => {

  return (
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
      <Column />
      <Column />
      <Column />

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
  );
}

export default ListColumns;
