import { Box, Button, TextField } from '@mui/material'
import Column from './Column/Column';
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify';


const ListColumns = ({ columns, createNewColumn, createNewCard }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumn = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title!')
      return
    }
    // console.log(newColumnTitle)
    const newColumnData = {
      title: newColumnTitle
    }

    await createNewColumn(newColumnData)
    toggleOpenNewColumn()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
          <Column key={column._id} column={column} createNewCard={createNewCard} />
        )}
        {!openNewColumnForm ?
          <Box onClick={toggleOpenNewColumn} sx={{
            minWidth: '250px',
            maxWidth: '250px',
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
          </Box> :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => { setNewColumnTitle(e.target.value) }}

              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  'fieldset': {
                    borderColor: 'white'
                  },
                  ':hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                },
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button onClick={addNewColumn}
                variant='contained'
                color="success"
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >Add Column</Button>
              <CloseIcon fontSize='small' sx={{
                color: 'white',
                cursor: 'pointer',
                '&:hover': { color: (theme) => theme.palette.warning.light }
              }} onClick={toggleOpenNewColumn} />
            </Box>
          </Box>}

      </Box>
    </SortableContext>
  );
}

export default ListColumns;
