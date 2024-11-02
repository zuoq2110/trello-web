import { Box, Button, TextField } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { createNewColumnApi } from '~/apis'
import { generatePlaceholderCard } from '~/pages/utils/formatters'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'


const ListColumns = ({ columns }) => {
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()

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
    //func này có nhiệm vụ gọi API tạo mới column và làm lại dữ liệu state board
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    //Phia FE phai tu lam dung lai state data board thay vi phai goi lai api fetchBoardDetailsAPI

    /*Doan nay dinh loi object is not extensible boi du da copy/clone ra gia tri newBoard nhung ban
    chat cua spread operator la shallow copy/clone nen dinh phai rules immutability trong redux toolkit khong
    dung dc push(sua gia tri mang truc tiep), cach don gian nhat la dung deep clone
    */
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    // const newBoard = { ...board }
    // newBoard.columns = newBoard.columns.concat([createdColumn])
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([createdColumn._id])

    //cap nhat du lieu vao redux store
    dispatch(updateCurrentActiveBoard(newBoard))
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
          <Column key={column._id} column={column}/>
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
                }
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
  )
}

export default ListColumns
