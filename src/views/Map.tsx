import Markers from '@/components/Markers'
import { MaterialTheme } from '@/types'
import { SetViewOnClick } from '@/utils'
import { MapContainer, TileLayer } from 'react-leaflet'
import { tss } from 'tss-react/mui'

function Map() {
  const { classes } = useStyles()

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={4}
      scrollWheelZoom={true}
      className={classes.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnClick />
      <Markers />
    </MapContainer>
  )
}

const useStyles = tss
  .withName({ Map })
  .create(({ theme }: { theme: MaterialTheme }) => ({
    map: {
      height: `calc(100vh - ${theme.headerHeight.desktop})`,
      width: '100vw',
      [theme.breakpoints.up('mobile')]: {
        height: `calc(100vh - ${theme.headerHeight.mobile})`,
      },
    },
  }))

export default Map
