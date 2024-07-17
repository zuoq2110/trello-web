import { Box, Button } from '@mui/material'
import {
  useColorScheme
} from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function App() {
  function SelectMode() {
    const { mode, setMode } = useColorScheme()
    const handleChange = (event) => {
      setMode(event.target.value)
    }

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Mode</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value='light'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
              <LightModeIcon fontSize='small' /> Light
            </Box>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
              <DarkModeOutlinedIcon fontSize='small' /> Dark
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
              <SettingsBrightnessIcon fontSize='small' /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    )
  }
  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    return (
      <Button
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    )
  }
  return (
    <>
      <SelectMode />
      <ModeToggle />
      Dương đz
      <div>
        <Button variant='contained'>ABC</Button>
      </div>
    </>
  )
}

export default App
