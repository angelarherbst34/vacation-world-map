import { useMapEvent } from 'react-leaflet'

export function SetViewOnClick(): null {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}
