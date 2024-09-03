import theme from '@/theme'
import { LatLngExpression } from 'leaflet'
import { Map } from 'leaflet'

export type MaterialTheme = typeof theme

export interface VacationLocation {
  address: string
  coord: LatLngExpression
}

export interface Vacation extends VacationLocation {
  id: string
  description: string
  imageSrc: string
}

export type MapContainerType = Map
