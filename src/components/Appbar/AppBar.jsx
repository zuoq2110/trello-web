import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import { Link } from 'react-router-dom'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import ModeSelect from '../ModeSelect/ModeSelect'
import Profiles from './Menus/Profiles'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Workspaces from './Menus/Workspaces'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
const AppBar = () => {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Link to='/boards'>
          <Tooltip title="Board List">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>
        <Link to='/'>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}>
            <SvgIcon fontSize='small' component={TrelloIcon} sx={{ color: 'white' }} />
            <Typography variant='span' sx={{
              fontSize: '1.2rem', fontWeight: 'bold',
              color: 'white'
            }} >Trello</Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            variant='outlined' startIcon={<LibraryAddIcon />}>Create</Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AutoCompleteSearchBoard />
        <ModeSelect />

        <Notifications />

        <Tooltip title="Help">
          <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profiles />
      </Box>

    </Box>
  )
}

export default AppBar
