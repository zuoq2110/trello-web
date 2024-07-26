import { Box, Button, Chip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const BoardBar = () => {
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
        <Chip icon={<DashboardIcon />} label='Duong' clickable
          sx={
            MENU_STYLES
          } />
        <Chip icon={<VpnLockIcon />} label='Public/Private Workspace' clickable
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
            ':hover' :{ borderColor: 'white'}
          }} >Invite</Button>
        <AvatarGroup max={7} sx={{
          gap: '10px',
          '& .MuiAvatar-root': {
            width: 34,
            height: 34,
            fontSize: '16px',
            border: 'none',
            color:'white',
            cursor:'pointer',
            ':first-child':{
              bgcolor: '#a4b0be'
            }
          }
        }}>
          <Avatar alt="Remy Sharp" src="https://bhd.1cdn.vn/2023/05/20/files-library-newimages-20230520_phim.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar
