import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { MaterialTheme } from '@/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function Header() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const handleAddNew = () => navigate('/add-new')
  const handleBack = () => navigate('/')
  const isAddNew = useMemo(
    () => location.pathname === '/add-new',
    [location.pathname],
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vacations
        </Typography>
        {isAddNew ? (
          <IconButton
            aria-label="return to map"
            className={classes.icon}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add vacation"
            className={classes.icon}
            onClick={handleAddNew}
          >
            <AddCircleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = tss
  .withName({ Header })
  .create(({ theme }: { theme: MaterialTheme }) => ({
    icon: { padding: 0, color: theme.palette.primary.contrastText },
  }))

export default Header
