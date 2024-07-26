
import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const BoardContent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
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
          <Box sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Column Title</Typography>
              <Box>
                <Tooltip title='More options'>
                  <ExpandMoreIcon id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                      cursor: 'pointer',
                      color: 'text.primary'
                    }} />
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0 5px',
              m: '0 5px',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)}
             - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://i.pinimg.com/550x/41/b3/97/41b397f20a332cb28d0234e4222e2d64.jpg"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >DuongDev</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon />}>20</Button>
                  <Button size="small" startIcon={<CommentIcon />}>20</Button>
                  <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon />
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Column Title</Typography>
              <Box>
                <Tooltip title='More options'>
                  <ExpandMoreIcon id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                      cursor: 'pointer',
                      color: 'text.primary'
                    }} />
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0 5px',
              m: '0 5px',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)}
             - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://i.pinimg.com/550x/41/b3/97/41b397f20a332cb28d0234e4222e2d64.jpg"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >DuongDev</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon />}>20</Button>
                  <Button size="small" startIcon={<CommentIcon />}>20</Button>
                  <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0, 0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{
                  p: 1.5, '&.MuiCardContent-root:last-child': { p: 1.5 },
                }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon />
              </Tooltip>
            </Box>
          </Box>
        </Box>

      </Box>
    </div>
  );
}

export default BoardContent
