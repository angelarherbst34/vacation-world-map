import AddressSearch from '@/components/AddressSearch'
import { useVacationStore } from '@/store'
import { MaterialTheme, Vacation, VacationLocation } from '@/types'
import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tss } from 'tss-react/mui'
import { v4 as uuidv4 } from 'uuid'

function AddNew() {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const { addVacation } = useVacationStore()
  const [vacationLocation, setVacationLocation] =
    useState<VacationLocation | null>(null)

  const handleSetVacationLocation = (
    vacationLocation: VacationLocation | null,
  ) => setVacationLocation(vacationLocation)

  const [description, setDescription] = useState('')
  const [imageSrc, setImageSrc] = useState('')

  const handleOpenFile = function (
    fileEvent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const input = fileEvent.target as HTMLInputElement
    const reader = new FileReader()
    reader.onload = function () {
      const result = reader.result
      if (typeof result === 'string') setImageSrc(result)
    }
    const fileToBeRead = input.files?.[0] ?? null
    if (fileToBeRead) reader.readAsDataURL(fileToBeRead)
  }

  const handleSubmit = () => {
    if (vacationLocation) {
      addVacation({
        id: uuidv4(),
        ...vacationLocation,
        description,
        imageSrc,
      } as Vacation)
      navigate('/')
    }
  }
  const handleCancel = () => navigate('/')

  return (
    <div className={classes.root}>
      <Box className={classes.form}>
        <div className={classes.header}>
          <Typography variant="h6" component="div">
            Add New Vacation
          </Typography>
        </div>
        <div className={classes.body}>
          <AddressSearch setVacationLocation={handleSetVacationLocation} />
          <TextField
            label="Vacation description"
            placeholder="Describe your vacation"
            multiline
            maxRows={3}
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value)
            }}
            fullWidth
          />
          <TextField
            style={{ display: 'block' }}
            type="file"
            onChange={handleOpenFile}
            fullWidth
          />
        </div>
        <div className={classes.footer}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </Box>
    </div>
  )
}

const FORM_HEIGHT = '500px'
const HEADER_FOOTER_HEIGHT = '75px'
const useStyles = tss
  .withName({ AddNew })
  .create(({ theme }: { theme: MaterialTheme }) => ({
    root: {
      backgroundColor: '#D3D3D3',
      height: `calc(100vh - ${theme.headerHeight.desktop})`,
      width: '100vw',
      padding: '20px',
      [theme.breakpoints.up('mobile')]: {
        height: `calc(100vh - ${theme.headerHeight.mobile})`,
      },

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      backgroundColor: 'white',
      borderRadius: '20px',
      height: FORM_HEIGHT,
      width: '600px',
      [theme.breakpoints.down('mobile')]: {
        width: '100%',
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '75px',
      width: '100%',
      borderBottom: '1px solid #D3D3D3',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '45px',
      height: `calc(${FORM_HEIGHT} - ${HEADER_FOOTER_HEIGHT} - ${HEADER_FOOTER_HEIGHT})`,
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      height: '75px',
      borderTop: '1px solid #D3D3D3',
    },
  }))

export default AddNew
