import { useVacationStore } from '@/store'
import { Typography } from '@mui/material'
import { Marker, Popup } from 'react-leaflet'

function Markers() {
  const { vacations } = useVacationStore()

  return (
    <>
      {vacations.map((vacation) => (
        <Marker position={vacation.coord} key={vacation.id}>
          <Popup>
            <Typography variant="h6" component="div" sx={{ padding: 1 }}>
              {vacation.description}
            </Typography>
            {vacation.imageSrc.length > 0 && (
              <img
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'contain',
                }}
                src={vacation.imageSrc}
                alt="uploaded image"
              />
            )}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default Markers
