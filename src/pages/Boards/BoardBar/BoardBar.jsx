import { Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/pages/utils/formatters'
import BoardUserGroup from './BoardUserGroup'
const BoardBar = ({ board }) => {
  const MENU_STYLES = {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '&:hover': {
      bgcolor: 'primary.50'
    }
  }
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      paddingX: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Tooltip title={board?.description}>
          <Chip icon={<DashboardIcon />} label={board?.title} clickable
            sx={
              MENU_STYLES
            } />
        </Tooltip>
        <Chip icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable
          sx={
            MENU_STYLES
          } />
        <Chip icon={<AddToDriveIcon />} label='Add to Google Drive' clickable
          sx={
            MENU_STYLES
          } />
        <Chip icon={<BoltIcon />} label='Automation' clickable
          sx={
            MENU_STYLES
          } />
        <Chip icon={<FilterListIcon />} label='Filter' clickable
          sx={
            MENU_STYLES
          } />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button startIcon={<PersonAddIcon />} variant='outlined'
          sx={{
            color: 'white',
            borderColor: 'white',
            ':hover': { borderColor: 'white' }
          }} >Invite</Button>
        <BoardUserGroup />
      </Box>
    </Box>
  );
}

export default BoardBar
